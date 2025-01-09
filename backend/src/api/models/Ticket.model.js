module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let TicketSchema = new Schema({
        user: { type: mongoose.Schema.Types.ObjectId , ref:'User',require:true},
        company: { type: mongoose.Schema.Types.ObjectId, ref :'Company',require:true},
        status: { type: Boolean, require: true},
        date: { type: Date,require:true},
        description: { type:String,require:true},
    },
    {
        timestamps: true
    });
    TicketSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const Ticket = mongoose.model('Ticket', TicketSchema);
    return Ticket;
}