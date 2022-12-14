const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//* bcrypt dependencies
const bcrypt = require('bcrypt');
const authenticateToken = require('../middlewares/authenticateToken');
const saltRounds = 10;

//CREATE
//sign-up
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    //conditionals - input check
    const existingUsername = await prisma.userLogin.findFirst({
        where: {
            username: username,
        },
    });
    const existingEmail = await prisma.userLogin.findFirst({
        where: {
            email: email,
        },
    });

    if (existingUsername) {
        return res.status(401).json({ msg: 'Username already taken' }); //401 - unauthorized
    }

    if (existingEmail) {
        return res.status(401).json({ msg: 'Email already taken' });
    }

    if (username.length < 3) {
        return res
            .status(401)
            .json({ msg: 'Length of username must be at least 3 letters' });
    }

    const hashedPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(saltRounds)
    );

    try {
        const signup = await prisma.userLogin.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });
        res.status(200).json({ msg: 'Sign up successful' });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await prisma.userLogin.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            user = await prisma.userLogin.findFirst({
                where: {
                    username: email,
                },
            });
            if (!user) {
                return res.status(401).json({ msg: 'Email not found' });
            }
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch === false) {
            return res.status(401).json({ msg: 'Incorrect password' });
        }

        let checkUserProfile = await prisma.userProfile.findUnique({
            where: {
                userLoginId: user.id,
            },
        });

        if (checkUserProfile) {
            const userToken = {
                id: user.id,
                username: user.username,
                userProfileId: checkUserProfile.id,
            };

            //create + assign a token
            const accessToken = jwt.sign(
                userToken,
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            return res
                .status(200)
                .header('auth-token', accessToken)
                .json({ msg: 'Redirecting to /home', authToken: accessToken });
        } else {
            const userToken = {
                id: user.id,
                username: user.username,
            };

            //create + assign a token
            const accessToken = jwt.sign(
                userToken,
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            return res
                .status(200)
                .header('auth-token', accessToken)
                .json({
                    msg: 'Redirecting to /createProfile',
                    authToken: accessToken,
                });
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
});

//READ
// router.get('/signout', authenticateToken, async(req, res) => {
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

router.get('/signin', authenticateToken, async (req, res) => {
    const findUserProfile = await prisma.userProfile.findUnique({
        where: {
            userLoginId: req.user.id,
        },
    });

    if (findUserProfile) {
        return res.status(403).json({ msg: 'user profile already exists' });
    }

    try {
        const userLoginInfo = await prisma.userLogin.findUnique({
            where: {
                id: req.user.id,
            },
        });
        if (userLoginInfo === null) {
            res.status(400).json({ msg: 'Wrong ID' });
        } else {
            res.status(200).json(userLoginInfo);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

//UPDATE
router.put('/', async (req, res) => {
    const { username, email } = req.body;
    const userLoginId = 8;

    if (username.length < 3) {
        return res
            .status(401)
            .json({ msg: 'Length of username must be at least 3 letters' });
    }

    try {
        const readUserProfile = await prisma.userLogin.update({
            where: {
                id: userLoginId,
            },
            data: {
                username: username,
                email: email,
            },
        });
        res.status(200).json(readUserProfile);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

// EXPORT
module.exports = router;
