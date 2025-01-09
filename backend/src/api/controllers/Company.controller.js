const slugify = require('slugify');
const db = require('../../database/db.config');
const Company = db.companies;

exports.create=(req, res) => {
    const {name,field,location} = req.body;
    if(!name || !field || !location ){
        return res.status(400).send({
            message : 'content can not be empty!'
         })
    }
    const newCompany = new Company({
        name : name,
        field : field,
        location : location,
    });
    newCompany.save(newCompany).then((data) =>{
        res.status(200).send({
            message : 'successfully created Company!'
        })
    }).catch(err =>{
        console.log(err);
    });
}
exports.findAll = (req, res)=> {
    Company.find({  
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
    Company.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Company not found"});
        }
        res.status(200).send({message:"Company was deleted successfully"});
    });
}
exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Company.findById(id).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.update =(req, res) =>{
    const id = req.params.id;
    const {name,field, location} = req.body;
    if(!id || !name || !field || !location) {
    res.status(400).send({ message: "content is required "});
    }
    Company.findByIdAndUpdate(id,
    {name: name, field: field, location : location},
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Company with id=${id}`});
        }
        res.status(200).send({ message: `Company was successfully updated`});
        }).catch((err) =>{
            console.log(err);
        });
}