import express from 'express'
import { getTask, updateTask, taskCreate } from '../controllers/task.js'
import { checkToken } from '../utils/checkAuth.js'

const router = express.Router()

router.post('/add-task', checkToken, taskCreate)
router.put('/updatetask/:id',checkToken, updateTask)
router.get('/get-task',checkToken, getTask)

export default router;