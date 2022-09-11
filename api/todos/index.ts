import {Router} from "express";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const router = Router();

router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos)
})

router.get('/:id', async (req, res) => {
    const todo = await prisma.todo.findFirst({
        where: {id: parseInt(req.params.id)}
    });
    res.json(todo)
})

router.post('/', async (req, res) => {
    try {
        const {body, dueDate = new Date(), title} = req.body;
        //todo: fix userId
        await prisma.todo.create({
            data: {
                body, dueDate, title, userId: 1
            }
        });
        res.json({success: true})
    } catch (e) {
        console.log(e)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const {body, dueDate = new Date(), title, isComplete} = req.body;
        await prisma.todo.update({
            where: {
                id: +req.params.id
            },
            data: {
                body, dueDate, title, isComplete
            }
        });
        res.json({success: true})
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await prisma.todo.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json({success: true})
    } catch (e) {
        console.log(e)
    }
})

export default router;