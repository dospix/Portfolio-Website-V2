import { useState } from "react"

export default function ApiProject() {
  const bookSubjectsInsideForm = {
    "history": false,
    "math": true,
    "science": false,
    "self-help": false,
    "social": false
  }

  const [formData, setFormData] = useState({
    titleKeywords: "",
    authorKeywords: "",
    previewFilter: "no filter",
    ...bookSubjectsInsideForm
  })

  function handleFormChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }))
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    console.log(formData)
  }

  const bookSubjectsHtmlElements = Object.keys(bookSubjectsInsideForm).map(subject => (
    <div className="flex items-center" key={subject}>
      <input
        type="checkbox"
        className="w-4 h-4"
        id={subject}
        name={subject}
        checked={formData.subject}
        onChange={handleFormChange}
      />
      <label className="pb-2 pl-4 select-none text-3xl" htmlFor={subject}>{subject}</label>
    </div>
  ))
    
  return (
  <>
    <div className='mt-24 text-center'>
        <h1 className='text-3xl font-semibold font-Montserrat'>Book recommendation using Google Books API</h1>
    </div>

    <div className='2xl:mt-16 lg:mt-8 sm:mt-6 mt-8 flex flex-col items-center justify-center'>
        <h1 className="text-3xl font-Montserrat">What type of book would you like us to recommend?</h1>
    </div>

    <form onSubmit={handleFormSubmit} className="mx-auto mt-10 w-2/5 flex justify-center flex-col font-Open_Sans">
      <label className="p-2 text-2xl" htmlFor="titleKeywords">Title keywords:</label>
      <input 
        type="text"
        className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-2xl text-black"
        placeholder='Eg. Alice Wonderland, can be blank'
        id="titleKeywords"
        name="titleKeywords"
        value={formData.titleKeywords}
        onChange={handleFormChange}
      />

      <label className="p-2 text-2xl" htmlFor="authorKeywords">Author keywords:</label>
      <input 
        type="text"
        className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-2xl text-black"
        placeholder='Eg. Lewis Carroll, can be blank'
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
        <option className="text-center text-2xl" value="no filter">no filter</option>
        <option className="text-center text-2xl" value="partial filter">part of the book must be previewable</option>
        <option className="text-center text-2xl" value="full filter">the entire book must be previewable</option>
      </select>

      <h1 className="ml-2 text-2xl">Book subjects:</h1>
      <div className="ml-2 mb-6 h-56 grid grid-cols-3">
        {bookSubjectsHtmlElements}
      </div>

      <button className="w-52 h-12 self-center rounded-xl bg-blue-500 text-xl text-white">Recommend Books</button>
    </form>
  </>
  )
}