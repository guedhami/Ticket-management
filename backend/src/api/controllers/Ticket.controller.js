const slugify = require('slugify');
const db = require('../../database/db.config');
const Ticket = db.tickets;

exports.create=(req, res) => {
    const {user,company,date,description} = req.body;
    if(!user || !company  || !date || !description){
        return res.status(400).send({
           message : 'content can not be empty!'
         })
    }
    const newTicket = new Ticket({
        user : user,
        company : company,
        status : false,
        date :date,
        description :description
    });
    newTicket.save(newTicket).then((data) =>{
        res.status(200).send({
            message : 'successfully created Ticket!'
        })
    }).catch(err =>{
        console.log(err);
    });
}
exports.findAll = (req, res)=> {
    Ticket.find({  
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
    Ticket.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Ticket not found"});
        }
        res.status(200).send({message:"Ticket was deleted successfully"});
    });
}
exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Ticket.findById(id).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.update =async(req, res) =>{
    const id = req.params.id;
    const {user,company,description,status,date} = req.body;
    try{
        
    Ticket.findByIdAndUpdate(id,
    {user : user,
        company : company,
        description : description,
        status :status,
        date :date},
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Ticket with id=${id}`});
        }
        res.status(200).send({ message: `Ticket was successfully updated`});
        }).catch((err) =>{
            console.log(err);
        });
    }catch{
        res.status(500).send({
            message : 'unsuccessfull !'
        });
    }
}
exports.findByUserCompany = (req, res) =>{
    const idU = req.params.idU;
    const idC = req.params.idC;
    if(!idU && !idC) {
        res.status(400).send({ message: "content is required"});
    }
    Ticket.find({user:idU,company:idC}).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.findByCompany = (req, res) =>{
    const idC = req.params.idC;
    if(!idC) {
        res.status(400).send({ message: "content is required"});
    }
    Ticket.find({company:idC}).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
