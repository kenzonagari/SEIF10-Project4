const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

//CREATE
router.post('/', async(req, res)=> {
    const {age, height, weight} = req.body;
    const userLoginId = 8;
    try {
        const createUserProfile = await prisma.userProfile.create({
            data:{
                age: age,
                height: height,
                weight: weight,
                userLoginId: userLoginId,
            }
        });
        res.status(200).json({msg: "user profile created"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//READ
router.get('/', async(req, res)=> {
    const userLoginId = 8;
    try {
        const readUserProfile = await prisma.userProfile.findMany({
            where:{
                userLoginId: userLoginId
            },
            include:{
                username: true,
                plates: true
            },
        });
        res.status(200).json(readUserProfile);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//UPDATE
router.put('/', async(req, res)=> {
    const {age, height, weight} = req.body;
    const userLoginId = 8;
    try {
        const readUserProfile = await prisma.userProfile.update({
            where:{
                userLoginId: userLoginId
            },
            data:{
                age: age,
                height: height,
                weight: weight
            }
        });
        res.status(200).json(readUserProfile);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

// EXPORT
module.exports = router;