import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import projects from './Projects'

function App() {
  const projectRoutes = projects.map(project => (
    <Route path={project.path} element={project.page} key={project.key} />
  ))
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {projectRoutes}
      </Routes>
    </Router>
  );
}

export default App;