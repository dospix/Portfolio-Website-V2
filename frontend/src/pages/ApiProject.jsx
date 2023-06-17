import { useState, useEffect } from "react"
import star from "../assets/images/star.png"
import half_star from "../assets/images/half-star.png"
import no_cover_image from "../assets/images/no-cover-image.png"

const BOOK_SUBJECTS_INSIDE_FORM = ["literature", "science fiction", "adventure", "history", "science", "self-help", "business", "health", "education", "children's literature"]

// Returns an object with all of the subjects and whether they are checked or not, and the HTML for the checkboxes with the subjects that will be displayed on the page
function handleBookSubjects(formData, handleFormChange){
  let bookSubjectsObject = {}
  if(sessionStorage.getItem("formData") !== null)
    bookSubjectsObject = JSON.parse(sessionStorage.getItem("formData")).subjects
  else
    BOOK_SUBJECTS_INSIDE_FORM.forEach(subject => bookSubjectsObject[subject] = false)
  
  const bookSubjectsHtmlElements = BOOK_SUBJECTS_INSIDE_FORM.map(subject => (
    <div className="mt-6 flex items-center" key={subject}>
      <input
        type="checkbox"
        className="w-4 h-4"
        id={subject}
        name={subject}
        checked={formData[subject]}
        onChange={handleFormChange}
      />
      <label className="pb-1 pl-3 select-none text-2xl" htmlFor={subject}>{subject}</label>
    </div>
  ))

  return [bookSubjectsObject, bookSubjectsHtmlElements]
}

function shortenStringWithoutCuttingWords(string, preferredSize){
  if(string && string.length > preferredSize){
    let whiteSpaceIndex = 300
    while(string[whiteSpaceIndex].trim() != "")
        whiteSpaceIndex -= 1
    string = string.slice(0, whiteSpaceIndex) + "..."
  }

  return string
}

function convertBookObjectToHtml(book){
  let bookData = book.volumeInfo

  bookData.description = shortenStringWithoutCuttingWords(bookData.description, 300)

  bookData.authors = bookData.authors ? bookData.authors.slice(0, 2).join(", ") : "authors not found"

  const stars = []
  if(bookData.averageRating){
      // round to nearest multiple of 0.5
      bookData.averageRating = Math.round(bookData.averageRating * 2) / 2

      let needsHalfStar = bookData.averageRating % 1 == 0.5 ? true : false
      let starCount = Math.floor(bookData.averageRating)
      
      while(starCount){
          stars.push(<img key={starCount} className="mb-3 mr-2 w-6 h-6" src={star} />)
          starCount -= 1
      }
      if(needsHalfStar)
          stars.push(<img key={0.5} className="mb-3 w-4 h-6" src={half_star} />)
  }

  let previewButton = null
  switch(book.accessInfo.viewability){
      case "ALL_PAGES":
          previewButton = <a className="w-28 py-1 mx-auto block rounded-2xl bg-blue-500 text-white" href={bookData.previewLink} target="_blank">View Book</a>
          break
      case "PARTIAL":
          previewButton = <a className="w-32 py-1 mx-auto block rounded-2xl bg-blue-500 text-white" href={bookData.previewLink} target="_blank">View Preview</a>
          break
      // The remaining value shold be "NO_PAGES"
      default:
          previewButton = <div className="w-28 py-1 mx-auto block rounded-2xl bg-slate-400 text-white">No Preview available</div>
  }
  
  return (
      <div className="mx-48 my-10 flex" key={book.id}>
          <img className="w-1/6" src={bookData.imageLinks ? bookData.imageLinks.thumbnail : no_cover_image} alt="book cover" />
          <div className="w-full px-5">
              <h1 className="mb-4 text-2xl">{bookData.title}</h1>
              <h2 className="mb-4 text-xl">{bookData.subtitle}</h2>
              <p className="font-Open_Sans">{bookData.description}</p>
          </div>
          <div className="w-1/5 text-center">
              <h1 className="mb-3 text-xl">{bookData.authors}</h1>
              <div className="flex justify-center">
                  {stars}
              </div>
              <p className="mb-3">{bookData.ratingsCount ? bookData.ratingsCount + " reviews" : "no reviews"}</p>
              {previewButton}
          </div>
      </div>
  )
}

export default function ApiProject() {
  const initialBookSubjects = {}
  BOOK_SUBJECTS_INSIDE_FORM.forEach(subject => initialBookSubjects[subject] = false)
  const [formData, setFormData] = useState(sessionStorage.getItem("formData") !== null ? JSON.parse(sessionStorage.getItem("formData")) : {
    titleKeywords: "",
    authorKeywords: "",
    previewFilter: "none",
    ...initialBookSubjects
  })

  function handleFormChange(event) {
    const {name, value, type, checked} = event.target

    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }))
  }

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData))
  }, [formData])
  
  const [bookSubjectsObject, bookSubjectsHtmlElements] = handleBookSubjects(formData, handleFormChange)
  useEffect(() => {
    setFormData(prevFormData => ({ ...prevFormData, ...bookSubjectsObject }));
  }, [])

  const [booksDisplayed, setBooksDisplayed] = useState([])

  function handleFormSubmit(event) {
    event.preventDefault()
    
    fetch("/api-project/submit", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
      .then(response => response.json())  
      .then(data => setBooksDisplayed(data.length ? data.map(book => convertBookObjectToHtml(book)) 
                                      : <h1 className="w-fit mx-auto mb-40 text-3xl font-Montserrat text-red-400 select-none">No books found! Try to remove some keywords/subjects.</h1>))
      .catch(error => {
        console.error('Error:', error);
      })
  }
    
  return (
  <>
    <div className='mt-24 text-center'>
        <h1 className='text-3xl font-semibold font-Montserrat'>Book recommendation using Google Books API</h1>
    </div>

    <div className='2xl:mt-16 lg:mt-8 sm:mt-6 mt-8 flex flex-col items-center justify-center'>
        <h1 className="text-3xl font-Montserrat">What type of book would you like us to recommend?</h1>
    </div>

    <form onSubmit={handleFormSubmit} className="mx-auto mt-10 mb-32 w-1/2 flex justify-center flex-col font-Open_Sans">
      <label className="p-2 text-2xl" htmlFor="titleKeywords">Title keywords:</label>
      <input 
        type="text"
        className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-2xl text-black"
        placeholder='E.g. Alice Wonderland, can be blank'
        id="titleKeywords"
        name="titleKeywords"
        value={formData.titleKeywords}
        onChange={handleFormChange}
      />

      <label className="p-2 text-2xl" htmlFor="authorKeywords">Author keywords:</label>
      <input 
        type="text"
        className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-2xl text-black"
        placeholder='E.g. Lewis Carroll, can be blank'
        id="authorKeywords"
        name="authorKeywords"
        value={formData.authorKeywords}
        onChange={handleFormChange}
      />

      <label className="p-2 text-2xl" htmlFor="previewFilter">Preview filter:</label>
      <select 
        className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-2xl text-black"
        id="previewFilter"
        name="previewFilter"
        value={formData.previewFilter}
        onChange={handleFormChange}
      >
        <option className="text-center text-2xl" value="none">no filter</option>
        <option className="text-center text-2xl" value="partial">part of the book must be previewable</option>
        <option className="text-center text-2xl" value="full">the entire book must be previewable</option>
      </select>

      <h1 className="ml-2 text-2xl">Book subjects:</h1>
      <div className="h-fit ml-2 mb-6 grid grid-cols-3">
        {bookSubjectsHtmlElements}
      </div>

      <button className="w-52 h-12 mt-5 self-center rounded-xl bg-blue-500 text-xl text-white">Recommend Books</button>
    </form>

    {booksDisplayed}
  </>
  )
}