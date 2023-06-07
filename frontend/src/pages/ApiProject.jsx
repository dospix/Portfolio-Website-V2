export default function Homepage() {
    
    return (
      <>
      <div className='2xl:mt-14 lg:mt-4 sm:mt-8 mt-8 text-center'>
          <h1 className='text-3xl font-semibold font-Montserrat'>Book recommendation using Google Books API</h1>
      </div>
      <div className='2xl:mt-16 lg:mt-8 sm:mt-6 mt-8 flex flex-col items-center justify-center'>
          <h1 className="text-3xl font-Montserrat">What type of book would you like us to recommend?</h1>
      </div>
      <form className="mx-auto mt-10 w-1/2 flex justify-center flex-col">
        <label className="p-2 text-lg" htmlFor="titleKeywords">Title keywords:</label>
        <input 
          type="text"
          className="ml-2 mb-2 p-2 text-lg"
          placeholder='Eg. Alice Wonderland, can be blank'
          id="titleKeywords"
          name="titleKeywords"
        />
        <label className="p-2 text-lg" htmlFor="authorKeywords">Author keywords:</label>
        <input 
          type="text"
          className="ml-2 mb-2 p-2 text-lg"
          placeholder='Eg. Lewis Carroll, can be blank'
          id="authorKeywords"
          name="authorKeywords"
        />
        <label className="p-2 text-lg" htmlFor="previewFilter">Preview filter:</label>
        <select 
          className="ml-2 mb-2 p-2 text-lg text-purple-700"
          id="previewFilter"
          name="previewFilter"
        >
          <option className="text-center" value="no filter">no filter</option>
          <option className="text-center" value="partial filter">part of the book must be previewable</option>
          <option className="text-center" value="full filter">the entire book must be previewable</option>
        </select>
        <h1 className="p-2 text-lg">Book subjects:</h1>
        <div className="grid grid-cols-3 h-40 bg-slate-400">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="history"
              name="history"
            />
            <label className="p-4 text-2xl" htmlFor="history">history</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="math"
              name="math"
            />
            <label className="p-2 text-2xl" htmlFor="math">math</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="science"
              name="science"
            />
            <label className="p-2 text-2xl" htmlFor="science">science</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="self-help"
              name="self-help"
            />
            <label className="p-2 text-2xl" htmlFor="self-help">self-help</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="biology"
              name="biology"
            />
            <label className="p-2 text-2xl" htmlFor="biology">biology</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="social"
              name="social"
            />
            <label className="p-2 text-2xl" htmlFor="social">social</label>
          </div>
        </div>
      </form>
  </>
    )
}