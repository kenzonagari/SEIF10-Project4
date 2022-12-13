const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticateToken = require("../middlewares/authenticateToken.js");

//CREATE
router.post('/', authenticateToken, async(req, res)=> {
    const {age, height, weight} = req.body;
    const userLoginId = req.user.id;

    try {
        const createUserProfile = await prisma.userProfile.create({
            data:{
                age: parseInt(age),
                height: parseInt(height),
                weight: parseInt(weight),
                userLoginId: userLoginId,
            }
        });

        const userToken = {
            id: req.user.id,
            username: req.user.username,
            userProfileId: createUserProfile.id
        };
        
        //create + assign a token
        const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).header('auth-token', accessToken).json({msg: "user profile created", authToken: accessToken});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//READ
router.get('/', authenticateToken, async(req, res)=> {
    const userLoginId = req.user.id;
    const userProfileId = req.user.userProfileId;
    console.log(userProfileId)
    if(!userProfileId){
        return res.status(403).json({msg: "redirecting to /createProfile"});
    }
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
router.put('/', authenticateToken, async(req, res)=> {
    const {username, age, height, weight} = req.body;
    const userLoginId = req.user.id;
    try {
        const updateUserProfile = await prisma.userProfile.update({
            where:{
                userLoginId: userLoginId
            },
            data:{
                age: parseInt(age),
                height: parseInt(height),
                weight: parseInt(weight)
            }
        });
        const updateUserLogin = await prisma.userLogin.update({
            where:{
                id: userLoginId
            },
            data:{
                username: username
            }
        });
        res.status(200).json({userProfile: updateUserProfile, msg: "redirecting to /userprofile"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

// EXPORT
module.exports = router;