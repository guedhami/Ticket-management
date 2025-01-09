module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let UserSchema = new Schema({
        name: { type: String, require: true},
        last_name: { type: String, require: true},
        phone_number: { type: Number, require: true},
        password:{type:String,require:true},
        email: { type: String,require:true},
        Job: { type: String, require: true},
        company: { type: mongoose.Schema.Types.ObjectId , ref:'Company',require:true},
    },
    {
        timestamps: true
    });
    UserSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const User = mongoose.model('User', UserSchema);
    return User;
}