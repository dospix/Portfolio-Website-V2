import { useState } from 'react'
import DarkModeSlider from './components/DarkModeSlider'
import PageTitle from './components/PageTitle'
import projects from './Projects'

function App() {
  const projectsHTML = projects.map(project => <h1 className='mt-10' key={project.key}>{project.name}</h1>)

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
