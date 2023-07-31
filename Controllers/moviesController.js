const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./data/movies.json')) //this will read the file we need to format it in the json for this we use JSON.parse()
exports.checkId=(req,res,next,value)=>{

    console.log('Movie id is',value);

    let movie=movies.find(el=>el.id===value*1);
    if(!movie){
        return res.status(404).json({
            status:'fail',
            message:`movie with id ${value} is not found`
        })
    }
    next();
}
exports.validateBody=(req,res,next)=>{
    if(!req.body.name || !req.body.realeaseYear){
        return res.status(400).json({
            status:'fail',
            message:'Not a valid movie data'
        });
    }
    next();
}
exports.getAllMovies=(req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    })
}

exports.getSingleMovie=(req, res) => {
    const id = req.params.id * 1;
    let movie = movies.find(el => el.id === id)
    // if (!movie) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: `Movie with id ${id} is failed`
    //     })
    // }

    //find movie based on response
    res.status(200).json({
        status: 'success',
        data: {
            movie: movie,
        }
    })
}

exports.updateMovie= (req, res) => {
    let id=req.params.id*1;
    let movieToUpdate=movies.find(el=>el.id===id);
    // if(!movieToUpdate){
    //  return res.status(404).json({
    //      status: 'fail',
    //      message: `Movie with id ${id} is failed`
    //  })
    // }
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


 exports.addMovie= (req, res) => {
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

exports.delteMovie=(req,res)=>{
    const id=req.params.id*1;
    const movieToDelete=movies.find(el=>el.id===id);
    // if(!movieToDelete){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: `Movie with id ${id} is failed`
    //     })
    // }
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


