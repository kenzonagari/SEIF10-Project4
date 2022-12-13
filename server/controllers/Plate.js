const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticateToken = require("../middlewares/authenticateToken.js");

//CREATE
router.post('/', authenticateToken, async(req, res)=> {
    const { ingredients, calories } = req.body;
    const userProfileId = req.user.userProfileId;
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
router.get('/', authenticateToken, async(req, res)=> {
    const userProfileId = req.user.userProfileId;
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
router.put('/:id', authenticateToken, async(req, res)=> {
    const {calories, ingredients} = req.body;
    const { id } = req.params;
    try {
        const updatePlate = await prisma.plate.update({
            where:{
                id: parseInt(id)
            },
            data:{
                calories: calories,
                ingredients: ingredients
            }
        });
        res.status(200).json({msg: "plate updated"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//DELETE
router.delete('/:id', authenticateToken, async(req, res)=> {
    const { id } = req.params;
    try {
        const deletePlate = await prisma.plate.delete({
            where:{
                id: parseInt(id)
            }
        });
        res.status(200).json({msg: "plate deleted"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

// EXPORT
module.exports = router;