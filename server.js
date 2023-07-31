const app = require('./app')
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })


// console.log(app.get('env'));
console.log(process.env)

mongoose.connect(process.env.CONN_STR, 
    { useNewUrlParser: true 
}).then((conn) => {
    console.log(conn);
    console.log('db connection successful');
}).catch((error)=>{
    console.log('An error Occurred')
})

const movieSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Name is Mandatory'],
    },
    description:String,
    duration:{
        type:Number,
        unique:true,
        required:[true,'Duration is required feild'], //required is like validator
    },
    ratings:{
        type:Number,
        default:4.5,
    },
})//based on this schema we can create a model

const movie=mongoose.model('Movie',movieSchema);//here we created the model

const port = process.env.PORT;
app.listen(port, () => {
    console.log('server is started')
})
