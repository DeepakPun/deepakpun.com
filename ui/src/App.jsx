import { Routes, Route, Navigate } from 'react-router'
import Landing from './components/Landing'
import ProjectList from './components/ProjectList'
import NotFound from './components/NotFound'
import CreateProject from './pages/CreateProject'
import ProjectDetails from './components/ProjectDetails'
import EditProject from './pages/EditProject'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <Routes>
          <Route path="/ui" element={<Landing />} />
          <Route path="/ui/projects" element={<ProjectList />} />
          <Route path="/ui/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/ui/projects/:projectId/edit" element={<EditProject />} />
          <Route path="/ui/projects/new" element={<CreateProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-slate-800 text-white"
      />
    </div>
  )
}

export default App;
