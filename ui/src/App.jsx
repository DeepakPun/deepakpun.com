import { Routes, Route } from 'react-router'
import Landing from './components/Landing'
import ProjectList from './components/ProjectList'
import NotFound from './components/NotFound'
import CreateProject from './pages/CreateProject'
import ProjectDetails from './components/ProjectDetails'
import EditProject from './pages/EditProject'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <Routes>
        <Route path='/ui/' element={<Landing />} />

        <Route path='/ui/projects' element={<ProjectList />} />
        <Route path='/ui/projects/new' element={<CreateProject />} />
        <Route path='/ui/projects/:projectId' element={<ProjectDetails />} />
        <Route path='/ui/projects/:projectId/edit' element={<EditProject />} />
        <Route path='/ui/projects' element={<ProjectList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
