const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* bcrypt dependencies
const bcrypt = require("bcrypt");
const saltRounds = 10;


//CREATE
//sign-up
router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;

    //conditionals - input check
    const existingUsername = await prisma.userLogin.findFirst({
        where: {
            username: username
        }
    });
    const existingEmail = await prisma.userLogin.findFirst({
        where: {
            email: email
        }
    });

    if (existingUsername) {
        return res.status(401).json({msg: "Username already taken"}); //401 - unauthorized
    }

    if (existingEmail) {
        return res.status(401).json({msg: "Email already taken"});
    }

    if (username.length < 3) {
        return res.status(401).json({msg: "Length of username must be at least 3 letters"}); 
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(saltRounds));
    
    try {
        const signup = await prisma.userLogin.create({
            data:{
                username: username,
                email: email,
                password: hashedPassword
            }
        });
        res.status(200).json({msg: "Sign up successful"});
    } catch (error) {
        res.status(500).json({msg: error});
    };
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    try {
        let user = await prisma.userLogin.findFirst({
            where:{
                email: email
            }
        });
        if (!user) {
            user = await prisma.userLogin.findFirst({
                where:{
                    username: email}
            });
            if(!user){
                return res.status(401).json({msg: "Email not found"});
            }
        };

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch === false) {
            return res.status(401).json({msg: "Incorrect password"});
        };

        // req.session.isAuth = true;
        // req.session.isAuthAdmin = false;
        // req.session.user = {
        //     _id: user._id,
        //     username: user.username,
        //     password: user.password
        // };

        // let checkUserProfile = await UserProfile.findOne({ "loginInfo": req.session.user._id });

        // if(checkUserProfile){
        //     return res.status(200).json({msg: "Redirecting to /home"});
        // } else {
        //     return res.status(200).json({msg: "Redirecting to /createProfile"});
        // }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({msg: error});
    }
});

//READ
// router.get('/signout', async(req, res) => {
//     try {
//         if(req.session){
//             req.session.destroy((err) => {
//                 if (err) {
//                     console.log(err);
//                     return next(err);
//                 }
//             });
//         } else {
//             return res.status(200).json({msg: "Sign out successful"});
//         }
//         return res.status(200).json({msg: "Sign out successful"});
//     } catch (error) {
//         return res.status(500).json({msg: error});
//     }
// });

// router.get('/', isAuth, async(req, res) => {
//     try {
//         const userLoginInfo = await UserLogin.find({ "_id" : req.session.user._id }).exec();
//         if (userLoginInfo === null) {
//             res.status(400).json({msg: "Wrong ID"});
//         } else {
//             res.status(200).json(userLoginInfo);
//         }
//     } catch (error) {
//         res.status(500).json({msg: error});
//     }
// });

//UPDATE
router.put('/', async(req, res)=> {

    const {username, email} = req.body;
    const userLoginId = 8;

    if (username.length < 3) {
        return res.status(401).json({msg: "Length of username must be at least 3 letters"}); 
    }

    try {
        const readUserProfile = await prisma.userLogin.update({
            where:{
                id: userLoginId
            },
            data:{
                username: username,
                email: email,
            }
        });
        res.status(200).json(readUserProfile);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

// EXPORT
module.exports = router;