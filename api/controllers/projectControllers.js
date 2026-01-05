import expressAsyncHandler from "express-async-handler"
import Project from "../models/Project.js"
import { createProjectSchema } from "../schemas/projectSchema.js"

/**
 * @desc    Get all projects from the database
 * @route   GET /api/v1/projects
 * @access  Public
 */
const getAllProjects = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const projects = await Project.find({})
    .skip(skip)
    .limit(limit)
    .sort({ order: 1 })

  const total = await Project.countDocuments()

  res.status(200).json({
    success: true,
    errors: null,
    count: projects.length,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    },
    message: 'Get all projects from the database',
    data: projects
  })
})

/**
 * @desc    Get single project the database
 * @route   GET /api/v1/projects/:projectId
 * @access  Public
 */
const getSingleProject = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params
  const foundProject = await Project.findById(projectId)

  if (!foundProject) {
    res.status(404);
    throw new Error(`Project not found with ID: ${projectId}`);
  }

  res.status(200).json({
    success: true,
    errors: null,
    message: "Project retrieved succesfully",
    data: foundProject
  })
})

/**
 * @desc    Create and save a project to the database
 * @route   POST /api/v1/projects
 * @access  Public
 */
const createProject = expressAsyncHandler(async (req, res) => {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    throw result.error
  }

  const projectExists = await Project.findOne({ title: result.data.title });
  if (projectExists) {
    res.status(400);
    throw new Error(`The project "${result.data.title}" already exists.`);
  }

  const newProject = await Project.create(result.data)

  res.status(201).json({
    success: true,
    data: newProject
  })
})

/**
 * @desc    Update a project
 * @route   PATCH /api/v1/projects/:projectId
 * @access  Public
 */
const updateProject = expressAsyncHandler(async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.projectId,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  if (!updatedProject) {
    res.status(404)
    throw new Error(`Project not found with ID: ${req.params.projectId}`)
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject
  })
})

/**
 * @desc    Delete a project
 * @route   DELETE /api/v1/projects/:projectId
 * @access  Public (or Private with Auth)
 */
const deleteProject = expressAsyncHandler(async (req, res) => {
  const deletedProject = await Project.findByIdAndDelete(req.params.projectId);

  if (!deletedProject) {
    res.status(404);
    throw new Error(`Cannot delete: Project not found with ID ${req.params.projectId}`);
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    data: { id: deletedProject._id } 
  })
})

export {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject
}
