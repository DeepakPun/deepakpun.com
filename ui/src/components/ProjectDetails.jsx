import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router"
import ProjectsAPI from '../services/api'

const ProjectDetails = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProject()
    // eslint-disable-next-line
  }, [projectId])

  const loadProject = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Loading project with ID:', projectId)

      const data = await ProjectsAPI.getProject(projectId);

      console.log('Loaded project:', data)

      setProject(data)
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Failed to load project. Please check if the project exists.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ProjectsAPI.deleteProject(projectId);
        navigate('/ui/projects');
      } catch (err) {
        setError('Failed to delete project');
        console.error('Error deleting project:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
          <p className="text-sm text-gray-400 mt-2">Project ID: {projectId}</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Project ID: {projectId}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/ui/projects"
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/ui/projects"
            className="text-blue-600 hover:text-blue-500 inline-flex items-center gap-2 mb-4"
          >
            ← Back to Projects
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <p className="text-gray-600">Project ID: {project._id || project.id}</p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <Link
                to={`/ui/projects/${project._id || project.id}/edit`}
                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 min-w-11"
                title="Edit Project"
              >
                <span className="text-sm">✏️</span>
                <span className="hidden sm:inline font-medium">Edit Project</span>
              </Link>

              <button
                onClick={handleDelete}
                className="px-3 sm:px-4 py-2 bg-white text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors flex items-center justify-center gap-2 min-w-11"
                title="Delete Project"
              >
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span className="hidden sm:inline font-medium text-red-700">Delete Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Project ID:</span>
                  <span className="text-gray-900 font-mono text-sm">{project._id || project.id}</span>
                </div>

                {project.createdAt && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Created:</span>
                    <span className="text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {project.updatedAt && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Last Updated:</span>
                    <span className="text-gray-900">
                      {new Date(project.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/ui/projects/${project._id || project.id}/edit`}
                  className="block w-full px-4 py-3 text-center bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  ✏️ Edit Project
                </Link>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Project link copied to clipboard!');
                  }}
                  className="block w-full px-4 py-3 text-center bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  🔗 Copy Project Link
                </button>

                <button
                  onClick={() => {
                    const projectData = {
                      name: project.name,
                      description: project.description,
                      id: project._id || project.id
                    };
                    navigator.clipboard.writeText(JSON.stringify(projectData, null, 2));
                    alert('Project data copied to clipboard!');
                  }}
                  className="block w-full px-4 py-3 text-center bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  📋 Copy Project Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails