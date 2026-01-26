import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import ProjectsAPI from '../services/api';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await ProjectsAPI.getProject(projectId);
        const data = {
          title: projectData.title || '',
          description: projectData.description || ''
        };
        setFormData(data);
        setOriginalData(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project details');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject()
    }
  }, [projectId, navigate])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const hasChanges = () => {
    if (!originalData) return false;
    return formData.title !== originalData.title ||
      formData.description !== originalData.description
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return
    }

    if (!hasChanges()) {
      toast.info('No changes to save');
      return
    }

    setSaving(true);

    try {
      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim()
      };

      await ProjectsAPI.updateProject(projectId, projectData);
      toast.success('Project updated successfully!');
      navigate(`/ui/projects/${projectId}`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      setErrors({});
      toast.info('Form reset to original values');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-slate-400 text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-6">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <Link
              to={`/ui/projects/${projectId}`}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>←</span>
              Back to Project
            </Link>

            <Link
              to="/ui/projects"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              All Projects
            </Link>
          </div>
        </div>

        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Edit Project
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Update your project details and keep your portfolio current
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
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.title
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-blue-500'
                    }`}
                  placeholder="Enter your project title..."
                  required
                  disabled={saving}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Project Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={8}
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200 ${errors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-blue-500'
                    }`}
                  placeholder="Describe your project, technologies used, key features, and what makes it special..."
                  required
                  disabled={saving}
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-2">{errors.description}</p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-slate-500 text-sm">
                    {formData.description.length} characters - Provide details about technologies, features, and goals.
                  </p>
                  {hasChanges() && (
                    <span className="text-yellow-400 text-sm flex items-center gap-1">
                      <span>●</span>
                      Unsaved changes
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  type="submit"
                  disabled={saving || !hasChanges()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving || !hasChanges()}
                  className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <span>↺</span>
                  Reset
                </button>

                <Link
                  to={`/ui/projects/${projectId}`}
                  className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>✕</span>
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              💡 <strong>Tip:</strong> Include technologies used, project goals, challenges overcome, and key features that make your project unique.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProject