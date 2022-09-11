import {Router} from "express";
import {PrismaClient} from '@prisma/client'
import {hash, genSalt, compare} from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()
const router = Router();

router.post("/signup", async (req, res) => {
    const salt = await genSalt(10);
    const hashed = await hash(req.body.password, salt);

    await prisma.user.create({
        data: {
            username: req.body.username, password: hashed
        }
    });

    res.json({success: true})
})

router.post("/login", async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })

    if (user) {
        const passwordsMatch = await compare(req.body.password, user.password);
        if (passwordsMatch) {
            const token = jwt.sign({userId: user.id}, "SOME_SECRET_KEY", {expiresIn: "1d"});
            res.json({token});
            return
        }
    }

    res.status(401).json({message: 'access denied'})
})
export default router;