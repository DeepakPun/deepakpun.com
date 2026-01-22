import Project from '../models/Project.js'
import Joi from 'joi'
import filter from 'leo-profanity'
import mongoose from 'mongoose'

const renderProjectIndex = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6

    const skip = (page - 1) * limit

    const [projects, totalProjects] = await Promise.all([
      Project.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Project.countDocuments({})
    ])

    const totalPages = Math.ceil(totalProjects / limit)

    res.render('projects/index', {
      projects,
      currentPage: page,
      totalPages,
      totalProjects,
      basePath: req.basePath,
    });

  } catch (err) {
    next(err)
  }
}

const renderNewProjectForm = async (req, res) => {
  res.render(`projects/new`, { basePath: req.basePath })
}

const createNewProject = async (req, res) => {
  try {
    // 1. Joi Structural Validation
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(10).required()
    });

    const { error, value } = schema.validate(req.body)
    if (error) {
      console.log(error.details[0].message)
      req.flash('error', error.details[0].message)
      return res.redirect(`${req.basePath}/projects/new`) // Redirect back to form
    }

    // 2. Profanity Validation
    const { title, description } = value
    if (filter.check(title) || filter.check(description)) {
      req.flash('error', "Content contains prohibited language.");
      return res.redirect(`${req.basePath}/projects/new`) // Redirect back to form
    }

    // 3. Successful Save
    const newProject = new Project({ title, description })
    await newProject.save()
    req.flash('success', 'Project created successfully!')
    res.redirect(`${req.basePath}/projects`)

  } catch (err) {
    req.flash('error', "Server error: Could not save project.")
    res.redirect(`${req.basePath}/projects/new`)
  }
}

const viewProjectDetails = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.isValidObjectId(projectId)) {
      req.flash('error', 'Invalid Project ID format.');
      return res.redirect(`${req.basePath}/projects`);
    }

    const foundProject = await Project.findById(projectId);

    if (!foundProject) {
      req.flash('error', 'Cannot find that project!');
      return res.redirect(`${req.basePath}/projects`)
    }

    res.render('projects/show', { project: foundProject, basePath: req.basePath })

  } catch (err) {
    next(err)
  }
}

const renderUpdateForm = async (req, res, next) => {

  try {
    const { projectId } = req.params;

    if (!mongoose.isValidObjectId(projectId)) {
      req.flash('error', 'Invalid Project ID format.');
      return res.redirect(`${req.basePath}/projects`);
    }

    const project = await Project.findById(projectId);

    if (!project) {
      req.flash('error', 'Cannot find that project to edit!');
      return res.redirect(`${req.basePath}/projects`);
    }

    res.render('projects/edit', { project: project, basePath: req.basePath });

  } catch (err) {
    next(err)
  }
}

const updateProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      description: Joi.string().min(10).max(1000).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      return res.redirect(`${req.basePath}/projects/${projectId}/edit`);
    }

    const { title, description } = value;
    if (filter.check(title) || filter.check(description)) {
      req.flash('error', "Your project contains prohibited language.");
      return res.redirect(`${req.basePath}/projects/${projectId}/edit`);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      req.flash('error', 'Cannot find that project!');
      return res.redirect(`${req.basePath}/projects`);
    }

    req.flash('success', 'Successfully updated project!');
    res.redirect(`${req.basePath}/projects/${updatedProject._id}`);

  } catch (err) {
    console.error("Update Error:", err);
    req.flash('error', 'Could not update project.');
    res.redirect(`${req.basePath}/projects/${req.params.projectId}/edit`);
  }
}

const deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params

    if (!mongoose.isValidObjectId(projectId)) {
      req.flash('error', 'Invalid Project ID.')
      return res.redirect(`${req.basePath}/projects`)
    }

    const deletedProject = await Project.findByIdAndDelete(projectId)

    if (!deletedProject) {
      req.flash('error', 'Could not find that project to delete.')
      return res.redirect(`${req.basePath}/projects`)
    }

    req.flash('success', 'Successfully deleted project!')
    res.redirect(`${req.basePath}/projects`)

  } catch (err) {
    next(err)
  }
}

export {
  renderProjectIndex,
  renderNewProjectForm,
  createNewProject,
  viewProjectDetails,
  updateProjectById,
  deleteProjectById,
  renderUpdateForm,
}