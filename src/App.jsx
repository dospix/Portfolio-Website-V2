import { useState } from 'react'
import DarkModeSlider from './components/DarkModeSlider'
import PageTitle from './components/PageTitle'
import projects from './Projects'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  function handleDarkMode(){
    setDarkMode((prevState) => !prevState)
  }

  const projectsHTML = projects.map(project => (
    <div className={`h-56 flex items-center justify-center rounded-xl shadow-[0_2px_10px_0_rgba(0,0,0,0.3)] hover:shadow-[0_2px_15px_0_rgba(0,0,0,0.3)] ${darkMode? "shadow-blue-500 hover:shadow-blue-500" : ""} mt-20 mx-96 ${project.key % 2 == 1 ? "flex-row-reverse" : ""}`} key={project.key}>
      <div className='w-2/3 h-full'>
        <h1 className='mt-6 text-lg font-semibold font-Montserrat'>{project.name}</h1>
        <p className='mt-8'>{project.description}</p>
        <div className='mt-10 mx-auto w-28 rounded-xl outline outline-offset-8 outline-1 outline-gray-600 hover:outline-2 hover:outline-blue-500 hover:cursor-pointer'>
          <h2 className='text-[0.9rem] font-Montserrat'>View Project</h2>
        </div>
      </div>
      <div className='w-1/3 h-full'>
        <img src={project.image} className={`h-full ${project.key % 2 == 1 ? "rounded-s-xl" : "rounded-e-xl"}`} alt='machine learning' />
      </div>
    </div>
  ))

  return (
    <div className={`App absolute ${darkMode ? "bg-zinc-900 text-white" : ""}`}>
    <>
      <DarkModeSlider onDarkMode={handleDarkMode} isDarkMode={darkMode}/>
      <PageTitle />
      <div className='mt-16 flex flex-col items-center justify-items-center'>
        <h1 className="text-3xl font-Montserrat">Personal Projects</h1>
        <div className='mt-1 h-0.5 w-20 bg-blue-500'></div>
      </div>
      <div className='mt-20 text-center'>
        {projectsHTML}
      </div>
      <Footer isDarkMode={darkMode} />
    </>
    </div>
  )
}

export default App
