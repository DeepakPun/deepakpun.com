import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ProjectsAPI from '../services/api'
import { toast } from 'react-toastify'

const CreateProject = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const newProject = await ProjectsAPI.createProject(formData)
      toast.success('Project created succesfully')
      navigate(`/ui/projects/${newProject._id}`)
    } catch (err) {
      setError('Failed to create project')
      console.error('Error creating project:', err)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/ui/projects"
            className="text-blue-600 hover:text-blue-500 inline-flex items-center gap-2"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🚀</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
            <p className="text-gray-600">Add a new project to your portfolio</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-vertical"
                  placeholder="Describe your project in detail..."
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg shadow-blue-500/25"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Project...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>✨</span>
                      Create Project
                    </span>
                  )}
                </button>

                <Link
                  to="/ui/projects"
                  className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-center font-semibold"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProject