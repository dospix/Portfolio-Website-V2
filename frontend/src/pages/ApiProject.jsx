export default function Homepage() {
  const bookSubjectsInsideForm = [
    "history",
    "math",
    "science",
    "self-help",
    "social"
  ]

  const bookSubjectsHtmlElements = bookSubjectsInsideForm.map(subject => (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="w-4 h-4"
        id={subject}
        name={subject}
      />
      <label className="pb-2 pl-4 text-3xl" htmlFor={subject}>{subject}</label>
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
    <form className="mx-auto mt-10 w-1/2 flex justify-center flex-col">
      <label className="p-2 text-2xl" htmlFor="titleKeywords">Title keywords:</label>
      <input 
        type="text"
        className="ml-2 mb-6 p-2 text-2xl"
        placeholder='Eg. Alice Wonderland, can be blank'
        id="titleKeywords"
        name="titleKeywords"
      />
      <label className="p-2 text-2xl" htmlFor="authorKeywords">Author keywords:</label>
      <input 
        type="text"
        className="ml-2 mb-6 p-2 text-2xl"
        placeholder='Eg. Lewis Carroll, can be blank'
        id="authorKeywords"
        name="authorKeywords"
      />
      <label className="p-2 text-2xl" htmlFor="previewFilter">Preview filter:</label>
      <select 
        className="ml-2 mb-10 p-2 text-2xl text-purple-700"
        id="previewFilter"
        name="previewFilter"
      >
        <option className="text-center text-2xl" value="no filter">no filter</option>
        <option className="text-center text-2xl" value="partial filter">part of the book must be previewable</option>
        <option className="text-center text-2xl" value="full filter">the entire book must be previewable</option>
      </select>
      <h1 className="p-2 text-2xl">Book subjects:</h1>
      <div className="ml-2 mb-6 h-56 grid grid-cols-3">
        {bookSubjectsHtmlElements}
      </div>
      <button className="bg-white text-black">Recommend books</button>
    </form>
  </>
    )
}