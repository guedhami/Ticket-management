module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let CompanySchema = new Schema({
        name: { type: String, require: true},
        field: { type: String, require: true},
        location: { type: String,require:true},
    },
    {
        timestamps: true
    });
    CompanySchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const Company = mongoose.model('Company', CompanySchema);
    return Company;
}