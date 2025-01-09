const slugify = require('slugify');
const db = require('../../database/db.config');
const Comment = db.comments;

exports.create=(req, res) => {
    const {ticket,date,description} = req.body;
    if(!ticket || !date || !description ){
        return res.status(400).send({
            message : 'content can not be empty!'
         })
    }
    const newComment = new Comment({
        ticket : ticket,
        date : date,
        description : description,
    });
    newComment.save(newComment).then((data) =>{
        res.status(200).send({
            message : 'successfully created Comment!'
        })
    }).catch(err =>{
        console.log(err);
    });
}
exports.findAll = (req, res)=> {
    Comment.find({  
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
    Comment.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Comment not found"});
        }
        res.status(200).send({message:"Comment was deleted successfully"});
    });
}
exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Comment.findById(id).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.findByTicket=(req,res)=>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Comment.find({ticket:id}).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })

}
exports.update =(req, res) =>{
    const id = req.params.id;
    const {ticket,date, description} = req.body;
    if(!id || !ticket || !date || !description) {
    res.status(400).send({ message: "content is required "});
    }
    Comment.findByIdAndUpdate(id,
    {ticket: ticket, date: date, description : description},
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Comment with id=${id}`});
        }
        res.status(200).send({ message: `Comment was successfully updated`});
        }).catch((err) =>{
            console.log(err);
        });
}