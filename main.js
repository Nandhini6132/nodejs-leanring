import express from "express";
import movieRoutes from './routes/movies.route.js'
import connectToDb from "./lib/db.js";

const app= express()
app.use(express.json()) //middleware-> to make understand that the req send is json format
app.use(express.urlencoded({extended: true})) //this middleware is for urlencoded req 


//connect to db
connectToDb()
app.get('/', (req,res)=>{
    res.json({msg:'success'})
})


//middleware---------->)))) client--->Middleware--->server
app.use('/movies',movieRoutes)



app.listen(6000, ()=>{
    console.log("Server is running on port 6000")
})