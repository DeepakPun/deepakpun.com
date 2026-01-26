import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import ProjectsAPI from '../services/api'
import { toast } from 'react-toastify';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await ProjectsAPI.getProject(projectId)

      const project = response.data || response

      if (project && (project._id || project.id)) {
        setFormData({
          title: project.title || '',
          description: project.description || ''
        });
      } else {
        toast.error('Project not found or invalid data')
        setError('Project not found or invalid data');
      }
    } catch (err) {
      setError('Failed to load project');
      console.error('Error loading project for edit:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all fields')
      return;
    }

    try {
      setSaving(true);
      setError(null);

      await ProjectsAPI.updateProject(projectId, formData)
      toast.success('Project updated succesfully')
      navigate(`/ui/projects/${projectId}`)

    } catch (err) {
      toast.error(err.message)
      setError('Failed to update project')
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
          <p className="text-sm text-gray-400 mt-2">Project ID: {projectId}</p>
        </div>
      </div>
    )
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cannot Edit Project</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Project ID: {projectId}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Back to Projects
            </Link>
            <button
              onClick={loadProject}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            to={`/ui/projects/${projectId}`}
            className="text-blue-600 hover:text-blue-500 inline-flex items-center gap-2 mb-4"
          >
            ← Back to Project
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Project</h1>
            <p className="text-gray-600">Update your project information</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
                  placeholder="Describe your project..."
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    <p className="text-red-600 font-medium text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving Changes...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>💾</span>
                      Save Changes
                    </span>
                  )}
                </button>

                <Link
                  to={`/ui/projects/${projectId}`}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
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

export default EditProject