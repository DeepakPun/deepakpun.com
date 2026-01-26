import express from 'express'
import { createProject, deleteProject, getAllProjects, getSingleProject, updateProject } from '../controllers/projectControllers.js'
import { createProjectSchema, updateProjectSchema } from '../schemas/projectSchema.js'
const router = express.Router()
import { validate } from '../middleware/validate.js'

router.route('/')
  .get(getAllProjects)
  .post(validate(createProjectSchema), createProject)

router.route('/:projectId')
  .get(getSingleProject)
  .patch(validate(updateProjectSchema), updateProject)
  .put(validate(updateProjectSchema), updateProject)
  .delete(deleteProject)

export default router