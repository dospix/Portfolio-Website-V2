import { useState } from 'react'
import DarkModeSlider from './components/DarkModeSlider'
import PageTitle from './components/PageTitle'
import projects from './Projects'
import Footer from './components/Footer'

function App() {
  const BORDER_RADIUS_SIZE = "xl"
  const projectsHTML = projects.map(project => (
    <div className={`flex items-center justify-center rounded-${BORDER_RADIUS_SIZE} shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-gray-300 mt-20 mx-96 ${project.key % 2 == 1 ? "flex-row-reverse" : ""}`} key={project.key}>
      <div className='w-2/3 h-full'>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className='border-black'>
          <h2>View Project</h2>
        </div>
      </div>
      <div className='w-1/3'>
        <img src={project.image} className={`h-56 w-full ${project.key % 2 == 1 ? `rounded-s-${BORDER_RADIUS_SIZE}` : `rounded-e-${BORDER_RADIUS_SIZE}`}`} alt='machine learning' />
      </div>
    </div>
  ))

  return (
    <div className="App">
    <>
      <DarkModeSlider />
      <PageTitle />
      <div className='mt-20 flex flex-col items-center justify-items-center'>
        <h1 className='text-2xl font-semibold'>Personal Projects</h1>
        <div className='mt-1 h-0.5 w-20 bg-blue-400'></div>
      </div>
      <div className='mt-20 text-center'>
        {projectsHTML}
      </div>
      <Footer />
    </>
    </div>
  )
}

export default App
