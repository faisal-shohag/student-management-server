import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();

router.delete('/modules/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const module = await prisma.modules.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json(module)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})





export default router;