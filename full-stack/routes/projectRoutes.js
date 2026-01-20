import express from 'express'
const router = express.Router()
import { createNewProject, deleteProjectById, renderNewProjectForm, renderProjectIndex, renderUpdateForm, updateProjectById, viewProjectDetails } from '../controllers/projectControllers.js'

router.route('/').get(renderProjectIndex).post(createNewProject)
router.route('/new').get(renderNewProjectForm)
router.route('/:projectId').get(viewProjectDetails).put(updateProjectById).delete(deleteProjectById)
router.route('/:projectId/edit').get(renderUpdateForm)
export default router