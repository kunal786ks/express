//import express package
const express = require('express'); //we are assigning the function to the variable

const morgan=require('morgan');//importing the package
const movieRouter=require('./Routes/moviesRoute')



let app = express(); //it will return the object

//custom middleware
const logger=function(req,res,next){
    console.log('custom middleare called');
    next();
}

//middleware
app.use(express.json())//it will pass the request.body in the post
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.static('./public'))
app.use(logger)
app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString();
    next();
})
//Route handler Function

//route = http method+url

// //get request in express
// app.get('/api/v1/movies',getAllMovies);
// //get request with specific id p
// app.get('/api/v1/movies/:id',getSingleMovie)
// //patch http method 
// app.patch('/api/v1/movies/:id',updateMovie)
// //post method to add movies
// app.post('/api/v1/movies',addMovie)
// //delete request in http method
// app.delete('/api/v1/movies/:id',delteMovie)

//creating a router with the express

app.use('/api/v1/movies',movieRouter)//mounting router

//to create a server we have app.listen
// const port = 3000;
// app.listen(port, () => {
//     console.log('server is started')
// })

module.exports=app;







