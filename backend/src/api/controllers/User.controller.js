const slugify = require('slugify');
const db = require('../../database/db.config');
const User = db.users;
const bcrypt  = require('bcrypt') 
const {isValidEmail} = require('../../middleware/UserValidation')


exports.create=async(req, res) => {
    const {name,last_name,phone_number,email,password,Job,company} = req.body;
    if(!name || !last_name || !phone_number || !email || !password || !Job || !company ){
        return res.status(400).send({
            message : 'content can not be empty!'
         })
    }
    const user = await User.findOne({email:email});
    if(user){
        return res.status(400).json({msg:"user exist already"});
    }
    if (!isValidEmail(email)){
        return res.status(400).json({msg:'invalid email adress format'})
    }
    if(password.length <8 || !/[A-Z]/.test(password)){
        return res.status(400).json({msg:'password should at least contains 8 caracters and contains at least 1 capital letter'})
    }
    try {
         const hashedPassword = await bcrypt.hash(password,10);
         const newUser = new User({
            name : name,
            last_name : last_name,
            phone_number : phone_number,
            email :email,
            password :hashedPassword,
            Job :Job,
            company :company
        });
        newUser.save(newUser).then((data) =>{
            res.status(200).send({
                message : 'successfully created User!'
            })
        }).catch(err =>{
            console.log(err);
        });
    }catch{
    res.status(500).send({
        message : 'unsuccessfull !'
    });
    }
    
    
}
exports.findAll = (req, res)=> {
    User.find({  
    }).then((data)=>{
      res.send(data);
    }).catch((err) =>{
        console.log(err);
    });
}
exports.delete = (req , res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({message:"content is required"});
    }
    User.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"User not found"});
        }
        res.status(200).send({message:"User was deleted successfully"});
    });
}
exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    User.findById(id).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.findManagers = (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({ message: "content is required"});
    }
    User.find({company:id,Job:"Manager"}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.findAdmins = (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({ message: "content is required"});
    }
    User.find({company:id,Job:"Admin"}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.update =async(req, res) =>{
    const id = req.params.id;
    const {name,last_name,phone_number,email,password,Job,company} = req.body;
    if(!name || !last_name || !phone_number || !email || !password || !Job || !company ){
        res.status(400).send({ message: "content is required "});
    }
    if (!isValidEmail(email)){
        return res.status(400).json({msg:'invalid email adress format'})
    }
    if(password.length <8 || !/[A-Z]/.test(password)){
        return res.status(400).json({msg:'password should at least contains 8 caracters and contains at least 1 capital letter'})
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
    User.findByIdAndUpdate(id,
    {name : name,
        last_name : last_name,
        phone_number : phone_number,
        email :email,
        password :hashedPassword,
        Job :Job,
        company :company},
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update User with id=${id}`});
        }
        res.status(200).send({ message: `User was successfully updated`});
        }).catch((err) =>{
            console.log(err);
        });
    }catch{
        res.status(500).send({
            message : 'unsuccessfull !'
        });
    }
}
exports.login = async(req , res)=>{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send('Invalid Email');
        }
        const isTheSame =await bcrypt.compare(req.body.password,user.password);
        if(!isTheSame){
            return res.status(400).send(' Email or Password not matched!');
        } 
        return res.send(user);
   
}
