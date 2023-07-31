import { useState, useEffect } from "react"

export default function UsedCarsMachineLearningProject() {
    const [formData, setFormData] = useState({
        titleKeywords: "",
        authorKeywords: "",
        previewFilter: "none"
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

        setIsLoading(true)
        setBooksDisplayed([])
    
        fetch("/google-api-project/submit", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => setBooksDisplayed(data.length ? data.map(book => convertBookObjectToHtml(book)) 
                                        : <h1 className="w-fit mx-auto mb-40 text-3xl font-Montserrat text-red-400 select-none">No books found! Try to remove some keywords/subjects.</h1>))
        .then(() => setIsLoading(false))
        .catch(error => {
        console.error('Error:', error);
        })
    }

    return (
    <>
        <div className='lg:mt-20 md:mt-16 sm:mt-14 mt-12 mx-2 text-center'>
            <h1 className='md:text-3xl text-2xl font-semibold font-Montserrat'>Predicting used cars prices using machine learning & neural networks</h1>
        </div>

        <div className='lg:mt-20 md:mt-16 sm:mt-14 mt-10 mx-2 flex items-center justify-center text-center'>
            <h1 className="md:text-3xl text-2xl font-Montserrat">Enter some information about the car whose price you would like to predict</h1>
        </div>

        <form onSubmit={handleFormSubmit} className="mx-auto sm:mt-8 mt-10 lg:mb-28 mb-20 xl:w-1/2 lg:w-2/3 w-5/6 flex justify-center flex-col font-Open_Sans">
            <label className="p-2 md:text-3xl text-2xl" htmlFor="titleKeywords">Title keywords:</label>
            <input 
                type="text"
                className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                placeholder='E.g. Alice Wonderland, can be blank'
                id="titleKeywords"
                name="titleKeywords"
                value={formData.titleKeywords}
                onChange={handleFormChange}
                maxLength="100"
            />

            <label className="p-2 md:text-3xl text-2xl" htmlFor="authorKeywords">Author keywords:</label>
            <input 
                type="text"
                className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                placeholder='E.g. Lewis Carroll, can be blank'
                id="authorKeywords"
                name="authorKeywords"
                value={formData.authorKeywords}
                onChange={handleFormChange}
                maxLength="100"
            />

            <label className="p-2 md:text-3xl text-2xl" htmlFor="previewFilter">Preview filter:</label>
            <select 
                className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                id="previewFilter"
                name="previewFilter"
                value={formData.previewFilter}
                onChange={handleFormChange}
            >
                <option className="text-center md:text-2xl sm:text-xl text-lg" value="none">no filter</option>
                <option className="text-center md:text-2xl sm:text-xl text-lg" value="partial">part of the book must be previewable</option>
                <option className="text-center md:text-2xl sm:text-xl text-lg" value="full">the entire book must be previewable</option>
            </select>

            <button className="w-52 h-12 sm:mt-8 mt-3 self-center rounded-xl bg-blue-500 text-xl text-white">Predict car price</button>
        </form>

        <div className='lg:mt-20 md:mt-16 sm:mt-14 mt-10 mx-2 flex items-center justify-center text-center'>
            <h1 className="md:text-3xl text-2xl font-Montserrat">Model creation process</h1>
        </div>
    </>
    )
}