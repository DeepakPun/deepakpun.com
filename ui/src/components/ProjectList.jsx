import { Link } from 'react-router'
import ProjectsAPI from '../services/api'
import { useEffect, useState } from 'react'
// import {toast} from 'react-toastify'

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await ProjectsAPI.getProjects()
      setProjects(data)
      setError(null)
    } catch (err) {
      console.error('Error loading projects:', err)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line
  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ProjectsAPI.deleteProject(projectId)
        await loadProjects()
      } catch (err) {
        setError('Failed to delete project');
        console.error('Error deleting project:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadProjects}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/3 bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-slate-400 text-lg">
            Explore some web applications and experiments
          </p>
        </div>

        <div className="mb-8 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-yellow-400 text-2xl hrink-0">⚠️</div>
            <div className="flex-1">
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Demo Portfolio Notice</h3>
              <div className="space-y-3 text-slate-300">
                <p className="text-sm">
                  <strong>This is a demonstration portfolio application.</strong> To maintain optimal performance and showcase functionality:
                </p>

                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                    <span className="text-red-400">🕒</span>
                    Data Retention Policy
                  </h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">•</span>
                      All project data is automatically deleted after <strong>24 hours</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">•</span>
                      Feel free to create, edit, and test all features
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">•</span>
                      Data resets daily to keep the demo fresh
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                    <span className="text-blue-400">🛡️</span>
                    Content Moderation
                  </h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      Using <strong>leo-profanity</strong> npm library for content filtering
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      Inappropriate language will prevent data submission
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      Keeps the demo environment family-friendly
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-slate-400 mt-3 flex items-center gap-2">
                  <span>💡</span>
                  <span>This ensures the demo remains clean, functional, and appropriate for all visitors.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <Link
            to="/ui/projects/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <span>+</span>
            Create New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project._id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-200 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">
                {project.title}
              </h3>
              <p className="text-slate-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/ui/projects/${project._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to={`/ui/projects/${project._id}/edit`}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Edit
                </Link>
                {/* <button className='bg-red-200 text-red-900 rounded px-3' onClick={() => handleDelete(project._id)}>Delete</button> */}
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="mt-2 text-slate-400">Loading projects...</p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-4">No projects found</p>
            <Link
              to="/ui/projects/new"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Create your first project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsList



/*
<div className="mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-yellow-400 text-2xl flex-shrink-0">⚠️</div>
            <div className="flex-1">
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Demo Portfolio Notice</h3>
              <div className="space-y-2 text-slate-300">
                <p className="text-sm">
                  <strong>This is a demonstration portfolio application.</strong> To maintain optimal performance and showcase functionality:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    All project data is automatically deleted after <strong>24 hours</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    Feel free to create, edit, and test all features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    Data resets daily to keep the demo fresh
                  </li>
                </ul>
                <p className="text-xs text-slate-400 mt-3">
                  💡 This ensures the demo remains clean and functional for all visitors.
                </p>
              </div>
            </div>
          </div>
        </div>
*/