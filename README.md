# :green_salad: GudFud
General Assembly SEIF 10 Capstone Project - PERN-based full-stack app

GudFud is a nutrition tracker and recipe logger app in which users can plan out their 'plates' more effectively.

## Motivation
A simple goal of mine to gain a bit of weight led to a deeper curiosity of what is actually in my plate - specifically, its caloric and nutritional contents. 

I saw an opportunity to create a simple app which takes in users' recipes or list of ingredients as input, and returns the corresponding caloric amount and nutritional contents. I found that through this opportunity, I could gain to learn PERN stack as I'd only used MERN in previous projects. Moreover, the project allows me to combine the use of relational database (via postgresQL) and external API - to store user data and fetch external nutritional data, respectively. 

Ultimately, I'd like to create a web app that is both pretty and intuitive, and this app could be a chance to explore a good combination of functionality and aesthetics. 

<img src="https://i.imgur.com/XxEBZnL.png" width="700">

## User Journey
As a user, I would like to:

1. Update my user profile
2. Schedule and book medical appointments, vaccination etc
3. View my diagnosis
3. View my medication order (medicine, dosage, duration etc)
4. View my billing info

## Flowchart
Our initial plan of the website. After deciding on the CRUD actions user and admin can perform, we decided on 4 main database models: 
<img src="https://i.imgur.com/AFup0AZ.png" width="900">

## Wireframe
We used Figma to create our wireframe:
<img src="https://i.imgur.com/9Zwqx0G.png" width="900">
<img src="https://i.imgur.com/QpYb0iB.png" width="1000">
1. Patient's need to see doctor
2. Checking for availability -> schedule appointment
3. Diagnosis and medication order by doctor
4. Medication or other appointment needed?
5. Any follow-up after the initial visit?

## Technologies used
Frontend
1. React
2. Bootstrap + React-Bootstrap
3. FullCalendar.js

Backend
1. Express
2. Mongodb + Mongoose
3. Node.js


