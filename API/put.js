import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();

router.patch('/submissions/:id', async(req, res) => {
    const { id } = req.params;
    let data = req.body;
    data = {...data, marks: parseFloat(data.marks)}
    try {
        const submission = await prisma.submittedAssignments.update({
            where: {
                id: parseInt(id)
            },
            data: {
                ...data
            }
        })
        res.status(200).json(submission);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})















export default router;