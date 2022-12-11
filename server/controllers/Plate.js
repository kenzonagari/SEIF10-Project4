const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//CREATE
router.post('/', async(req, res)=> {
    const { ingredients, calories } = req.body;
    const userProfileId = 3;
    try {
        const createPlate = await prisma.plate.create({
            data:{
                ingredients: ingredients,
                calories: calories,
                userProfileId: userProfileId
            }
        });
        res.status(200).json({msg: "plate created"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//READ
router.get('/', async(req, res)=> {
    const userProfileId = 3;
    try {
        const findPlate = await prisma.plate.findMany({
            where:{
                userProfileId: userProfileId
            }
        });
        res.status(200).json(findPlate);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//UPDATE
router.put('/', async(req, res)=> {
    const { ingredients, calories } = req.body;
    const userProfileId = 3;
    try {
        const createPlate = await prisma.plate.update({
            data:{
                ingredients: ingredients,
                calories: calories,
                userProfileId: userProfileId
            }
        });
        res.status(200).json({msg: "plate created"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//DELETE
router.delete('/', async(req, res)=> {
});

// EXPORT
module.exports = router;