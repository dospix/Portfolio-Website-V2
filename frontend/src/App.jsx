import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import projects from './Projects'
import DarkModeSlider from './components/DarkModeSlider'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" ? true : false)

  function handleDarkMode(){
    setDarkMode((prevState) => !prevState)
  }

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode))
  }, [darkMode])

  const projectRoutes = projects.map(project => (
    <Route path={project.path} element={project.page} key={project.key} />
  ))
  
  return (
    <div className={`absolute w-full ${darkMode ? "bg-zinc-900 text-white" : ""}`}>
      <Router>
        <DarkModeSlider onDarkMode={handleDarkMode} isDarkMode={darkMode}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {projectRoutes}
        </Routes>
        <Footer isDarkMode={darkMode} />
      </Router>
    </div>

  );
}

export default App;