import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();

//all ourses
router.get('/courses', async (req, res) => {
    try {
        const courses = await prisma.courses.findMany();
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.get('/courses/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const course = await prisma.courses.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                modules: true,
                students: true,
                assignments: true, 
                feed_backs: true,
                modules: {
                    include: {
                        assignments: true
                    }
                }
            }
        })
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/courses/modules/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const module = await prisma.modules.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                assignments: true
            }
        })
        res.status(200).json(module)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/courses/assignments/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const assignment = await prisma.assignments.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(assignment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('courses/recordings/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const recording = await prisma.recordings.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(recording)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router;