import { useState } from 'react'
import DarkModeSlider from '../components/DarkModeSlider'
import Footer from '../components/Footer'

export default function Homepage() {
    const [darkMode, setDarkMode] = useState(false)

    function handleDarkMode(){
      setDarkMode((prevState) => !prevState)
    }
    
    return (
        <div className={`absolute w-full ${darkMode ? "bg-zinc-900 text-white" : ""}`}>
          <DarkModeSlider onDarkMode={handleDarkMode} isDarkMode={darkMode}/>
          <Footer isDarkMode={darkMode} />
        </div>
    )
}