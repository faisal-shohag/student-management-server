import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();

//students
router.post('/students', async (req, res) => {
    let data = req.body;
    data = {...data, batch: parseInt(data.batch), courseId: parseInt(data.courseId)}
    try {
        const student = await prisma.students.create({
            data: data
        })
        res.status(201).json(student)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


//courses
router.post('/courses', async (req, res) => {
    let data = req.body;
    data = {...data, batch: parseInt(data.batch)}
    try {
        const course = await prisma.courses.create({
            data: data
        })
        res.status(201).json(course)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.post('/students', async (req, res) => {
    const data = req.body;
    try {
        const course = await prisma.classes.create({
            data: data
        })
        res.status(201).json(course)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.post('/modules', async (req, res) => {
    const data = req.body;
    try {
        const module = await prisma.modules.create({
            data: data
        })
        res.status(201).json(module)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


router.post('/assignments', async (req, res) => {
    let data = req.body;
    data = {...data, deadline: new Date(data.deadline), moduleId: parseInt(data.moduleId)}
    console.log(data)
    try {
        const assignment = await prisma.assignments.create({
            data: data
        })
        res.status(201).json(assignment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.post('/recordings', async (req, res) => {
    let data = req.body;
    data = {...data, date: new Date(data.date), moduleId: parseInt(data.moduleId)}
    try {
        const recording = await prisma.recordings.create({
            data: data
        })
        res.status(201).json(recording)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


router.post('/resources', async (req, res) => {
    let data = req.body;
    data = {...data, date: new Date(data.date), moduleId: parseInt(data.moduleId)}
    try {
        const resource = await prisma.resources.create({
            data: data
        })
        res.status(201).json(resource)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.post('/confirm', async (req, res) => {
    let data = req.body;
    console.log("data: ", data)
    try {

        const studentCourse = await prisma.studentCourses.findUnique({
            where: {
              studentId_courseId: data,
            },
          });

          console.log("student_course: ", studentCourse)

          let confirm

        if(!studentCourse) {
            confirm = await prisma.studentCourses.create({
                data: data
            })
        }
        

        const student = await prisma.students.findUnique({
            where: {
                id: Number(data.studentId)
            },
        })

        let status = student.status === "pending" ? "confirmed" : "pending"

        const updatedStudent = await prisma.students.update({
            where: { id: Number(data.studentId) },
            data: {
             status: status
            },
          });

        res.status(201).json({updatedStudent})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.post('/courses/assignments/submission', async(req, res) => {
     let data = req.body;
     data = {...data, assignmentId: parseInt(data.assignmentId), studentId: parseInt(data.studentId)}
     try {
        const submission = await prisma.submittedAssignments.create({
            data: data
        })
        res.status(201).json(submission)
     } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
     }
})


export default router;
