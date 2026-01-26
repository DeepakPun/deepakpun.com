import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { toast } from 'react-toastify'
import ProjectsAPI from '../services/api'

const CreateProject = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setSaving(true)

    try {
      await ProjectsAPI.createProject(formData)
      toast.success('Project created successfully!')
      navigate('/ui/projects')
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Failed to create project. Please try again.')
    } finally {
      setSaving(false)
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Create New Project
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Add a new project to your portfolio and showcase your work
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your project title..."
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Project Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  placeholder="Describe your project, technologies used, key features, and what makes it special..."
                  required
                  disabled={saving}
                />
                <p className="text-slate-500 text-sm mt-2">
                  Provide a detailed description of your project, including technologies, features, and goals.
                </p>
              </div>

              <div className="text-right">
                <span className="text-slate-500 text-sm">
                  {formData.description.length} characters
                </span>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={saving || !formData.title.trim() || !formData.description.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <span>+</span>
                      Create Project
                    </>
                  )}
                </button>

                <Link
                  to="/ui/projects"
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-all duration-200 flex items-center justify-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Need help? Make sure to include details about technologies used, project goals, and key features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProject