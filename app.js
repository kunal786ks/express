//import express package
const express = require('express'); //we are assigning the function to the variable
const fs = require('fs');
let app = express(); //it will return the object
let movies = JSON.parse(fs.readFileSync('./data/movies.json')) //this will read the file we need to format it in the json for this we use JSON.parse()

//custom middleware
const logger=function(req,res,next){
    console.log('custom middleare called');
    next();
}

//middleware
app.use(express.json())//it will pass the request.body in the post
app.use(logger)
app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString();
    next();
})
//Route handler Function
const getAllMovies=(req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    })
}

const getSingleMovie=(req, res) => {
    const id = req.params.id * 1;
    let movie = movies.find(el => el.id === id)
    if (!movie) {
        return res.status(200).json({
            status: 'fail',
            message: `Movie with id ${id} is failed`
        })
    }

    //find movie based on response
    res.status(200).json({
        status: 'success',
        data: {
            movie: movie,
        }
    })
}

const updateMovie= (req, res) => {
    let id=req.params.id*1;
    let movieToUpdate=movies.find(el=>el.id===id);
    if(!movieToUpdate){
     return res.status(404).json({
         status: 'fail',
         message: `Movie with id ${id} is failed`
     })
    }
     let index=movies.indexOf(movieToUpdate);
 
     Object.assign(movieToUpdate,req.body);
 
     movies[index]=movieToUpdate
 
     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
         res.status(200).json({
             status: 'success',
             data: {
                 movie: movieToUpdate,
             }
         })
     })
 }


 const addMovie= (req, res) => {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newId }, req.body)//it merge the two id 
    movies.push(newMovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                movie: newMovie
            }
        })
    })
    // res.send('Created')
}

const delteMovie=(req,res)=>{
    const id=req.params.id*1;
    const movieToDelete=movies.find(el=>el.id===id);
    if(!movieToDelete){
        return res.status(404).json({
            status: 'fail',
            message: `Movie with id ${id} is failed`
        })
    }
    const index=movies.indexOf(movieToDelete);
    movies.splice(index,1);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: 'success',
            data: {
                movie: null
            }
        })
    })

}
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



//chaining the above method with the app.route
app.route('/api/v1/movies').get(getAllMovies).post(addMovie)


app.route('/api/v1/movies/:id').get(getSingleMovie).patch(updateMovie).delete(delteMovie)


//to create a server we have app.listen
const port = 3000;
app.listen(port, () => {
    console.log('server is started')
})








