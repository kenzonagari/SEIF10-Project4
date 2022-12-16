const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { fetch } = require("undici");

const authenticateToken = require("../middlewares/authenticateToken.js");
const e = require("express");

const fetchCalories = async(ingredientObj) => {
    let calories = 0;
    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=05ca2114&app_key=6d03af6370c26f9caa8d71972e5d53c3`,
    {    
        method: "POST", 
        headers: {
                    "Content-type": "application/json",
                },
        body: JSON.stringify(ingredientObj) 
    })
    .then((response) => {
        return response.json();
    })
    .then((data)=>{
        calories = data.calories;
    })

    return calories;
}

//CREATE
router.post('/', authenticateToken, async(req, res)=> {
    const { ingredients } = req.body;
    let calories = 0;
    const userProfileId = req.user.userProfileId;
    try {

        const ingredientObj = {
            ingr: ingredients
        }

        calories = await fetchCalories(ingredientObj).then((data)=>{
            if(data){
                return data;
            } else {
                return 0;
            }
        });

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

router.get('/:id', authenticateToken, async(req, res)=> {
    const { id } = req.params;
    try {
        const findPlate = await prisma.plate.findUnique({
            where:{
                id: parseInt(id)
            }
        });
        res.status(200).json(findPlate);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//UPDATE
router.put('/:id', authenticateToken, async(req, res)=> {
    const {ingredients} = req.body;
    let calories = 0;
    const { id } = req.params;
    try {
        
        const ingredientObj = {
            ingr: ingredients
        }

        calories = await fetchCalories(ingredientObj).then((data)=>{
            if(data){
                return data;
            } else {
                return 0;
            }
        });

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