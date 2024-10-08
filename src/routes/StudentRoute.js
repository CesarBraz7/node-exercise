import { Router } from "express";
import StudentController from '../controllers/StudentController.js'

const router = Router()

router.post('/student/', StudentController.addStudent)
router.get('/student/', StudentController.getAll)
router.put('/student/:id', StudentController.updateStudent)
router.delete('/student/:id', StudentController.delete)
router.get('/student/:id', StudentController.getAverage)

export default router