import { useState } from 'react'
import DarkModeSlider from './components/DarkModeSlider'

function App() {

  return (
    <div className="App">
    <>
      <DarkModeSlider />
      <div className='mt-10 text-center'>
        <h1 className='text-2xl font-semibold'>Hello, I'm Dospinescu Daniel</h1>
        <h2 className='mt-3 font-extralight' >I am a programmer that uses Python and JavaScript</h2>
      </div>
    </>
    </div>
  )
}

export default App
