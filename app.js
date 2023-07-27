//import express package
const express=require('express'); //we are assigning the function to the variable
const fs=require('fs');
let app=express(); //it will return the object
let movies=JSON.parse(fs.readFileSync('./data/movies.json')) //this will read the file we need to format it in the json for this we use JSON.parse()



//middleware
app.use(express.json())//it will pass the request.body in the post





//route = http method+url

//get request in express
app.get('/api/v1/movies',(req,res)=>{
    res.status(200).json({
        status:'success',
        count:movies.length,
        data:{
            movies:movies
        }
    })
})



//post method to add movies
app.post('/api/v1/movies',(req,res)=>{
    const newId=movies[movies.length-1].id+1;
    const newMovie=Object.assign({id:newId},req.body)//it merge the two id 
    movies.push(newMovie)
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:'success',
            data:{
                movie:newMovie
            }
        })
    })
    // res.send('Created')
})








//to create a server we have app.listen
const port=3000;
app.listen(port,()=>{
    console.log('server is started')
})








