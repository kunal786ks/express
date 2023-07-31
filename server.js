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






const port = process.env.PORT;
app.listen(port, () => {
    console.log('server is started')
})
