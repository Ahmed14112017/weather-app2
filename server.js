// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require("express");
const app=express();

// Start up an instance of app
const bodyParser=require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors=require("Cors");
app.use(Cors());
// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
const port=6060;
const server = app.listen(port,()=>console.log(`server running at http://localhost:${port}`))


app.get("/all",function(req,res){ //==> send  project data object to client side//get data from server route
    res.send(projectData)
})
app.post("/postdata",function(req,res){ //=>add data from clientside to project data object // post data to server route
    console.log(req.body);
    res.send("success send")
    projectData={
        date:req.body.newDate,
        temp:req.body.temp,
        feelings:req.body.feelings,
    }
    
})