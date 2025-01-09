module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let CommentSchema = new Schema({
        ticket: { type: mongoose.Schema.Types.ObjectId , ref:'Ticket',require:true},
        date: { type: Date, require: true},
        description: { type: String,require:true},
    },
    {
        timestamps: true
    });
    CommentSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const Comment = mongoose.model('Comment', CommentSchema);
    return Comment;
}