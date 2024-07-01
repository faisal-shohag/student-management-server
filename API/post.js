import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();


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



export default router;
