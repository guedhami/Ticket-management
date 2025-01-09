const express=require('express');
const database = require('./src/database/db.config');
const cors=require('cors');
require('dotenv').config();
const app=express();
app.unsubscribe(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
database.mongoose.connect(database.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to database');
}).catch(err=>{
    console.log(err);
});
;
app.get('/',(req, res)=>{
    res.send({message: 'hello, world'});
})

require('./src/api/routes/routes')(app);
app.listen(process.env.PORT, ()=>{
    console.log('listening on port' , process.env.Port);
})