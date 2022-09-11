import {Router} from "express";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const router = Router();

export default router;