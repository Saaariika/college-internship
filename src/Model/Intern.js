const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const internSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        unique: true,
        required: true
    },
    mobile:
    {
        type: Number,
        unique: true,
        required: true

    },
    collegeId:
    {
        type: objectId,
        required: true,
        ref: 'college'
    },
    idDeleted:
    {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    })
module.exports = mongoose.model('intern', internSchema)