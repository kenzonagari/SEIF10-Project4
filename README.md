# :green_salad: GudFud
General Assembly SEIF 10 Capstone Project - PERN-based full-stack app

GudFud is a nutrition tracker and recipe logger app in which users can plan out their 'plates' more effectively.

## :brain: Motivation
A simple goal of gaining a bit of weight led me to a deeper curiosity of what is actually in my plate - specifically, its caloric and nutritional contents. 

I saw an opportunity to create a simple app which takes in users' recipes or list of ingredients as input, and returns the corresponding caloric amount and nutritional contents. I found that through this opportunity, I could gain to learn PERN stack as I'd only used MERN in previous projects. Moreover, the project allows me to combine the use of relational database (via postgresQL) and external API - to store user data and fetch external nutritional data, respectively. 

Ultimately, I'd like to create a web app that is both pretty and intuitive, and this app could be a chance to explore a good combination of functionality and aesthetics. 

<img src="https://i.imgur.com/1n1V2Ef.png" width="700">

## 👩‍🦱 User Journey
As a user, I would like to:

(MVP)

0. Sign up / sign in user profile.
1. Receive nutritional info from recipes/ingredients that I input.
2. Read nutritional info in a nice, easily digestable visual form.
3. CRUD recipes/ingredients

(FUTURE IMPROVEMENTS)

1. CRUD diet/caloric info.
2. Receive recipe suggestion based on diet/caloric input.
3. Group plates into a daily meal planner.

## 🗃️ Flowchart
After deciding on the CRUD actions users can perform, I decided on 3 main database models (with their relations notated): 
<img src="https://i.imgur.com/6s6Rgo6.png" width="500">

## 🔧 Technologies used
Frontend
1. React
2. React-Router
3. Tailwind
4. Chart.js

Backend
1. Express
2. PostgresQL + Prisma
3. Node.js
4. JSON Web Token
5. Udici

Nutritional data of recipes are taken from [EDAMAM API](https://developer.edamam.com/edamam-nutrition-api-demo)

## Screenshots

<img src="https://i.imgur.com/3uACsVO.png" width="700">
<img src="https://i.imgur.com/lORpfiN.png" width="700">
<img src="https://i.imgur.com/zeby2O5.png" width="700">
<img src="https://i.imgur.com/zodlCOY.png" width="700">
<img src="https://i.imgur.com/cwOqHA8.png" width="700">

## :warning: Note

The website is yet to be hosted for the time being. Thank you for your patience! 




