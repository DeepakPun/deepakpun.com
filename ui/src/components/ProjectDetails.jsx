import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import ProjectsAPI from '../services/api';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await ProjectsAPI.getProject(projectId);
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project details');
        navigate('/ui/projects');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId, navigate]);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await ProjectsAPI.deleteProject(projectId);
      toast.success('Project deleted successfully!');
      navigate('/ui/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-slate-400 text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h2>
          <p className="text-slate-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/ui/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/ui/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span>
            Back to Projects
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
              <span>Project ID: {project._id}</span>
              {project.createdAt && (
                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              )}
              {project.updatedAt && (
                <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">{project.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/ui/projects/${project._id}/edit`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span>✏️</span>
                  Edit Project
                </Link>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span>🗑️</span>
                  Delete Project
                </button>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <span>🚀</span>
                    View Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Delete Project</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete "{project.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Project'
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails