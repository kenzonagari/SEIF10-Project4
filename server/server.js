const express = require("express");
const path = require("path");

//* dotenv
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT ?? 3000;

//* MIDDLEWARE
app.use(express.static("../client/dist"))
app.use(express.json()); //this is how Express interprets body from client side
app.use(express.static("../client/dist"));

//* CONTROLLERS
const UserLogin = require('./controllers/UserLogin.js'); 
app.use('/api/userlogin', UserLogin);
const UserProfile = require('./controllers/UserProfile.js'); 
app.use('/api/userprofile', UserProfile);
const Plate = require('./controllers/Plate.js'); 
app.use('/api/plate', Plate);

// for react router to work
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
});

app.get("/deleteUser", async (req, res) => {
    const user = await prisma.userLogin.deleteMany({})
    res.json(user);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});