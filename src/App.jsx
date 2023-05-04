import { useState } from 'react'
import DarkModeSlider from './components/DarkModeSlider'
import PageTitle from './components/PageTitle'
import projects from './Projects'

function App() {
  const projectsHTML = projects.map(project => (
    <div className={`flex mt-20 mx-96 items-center justify-center ${project.key % 2 == 1 ? "flex-row-reverse" : ""}`} key={project.key}>
      <div className='w-2/3 h-full'>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className='border-black'>
          <h2>View Project</h2>
        </div>
      </div>
      <div className='w-1/3'>
        <img src={project.image} alt='machine learning' />
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
    </>
    </div>
  )
}

export default App
