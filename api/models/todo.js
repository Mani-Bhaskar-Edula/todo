const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const todoschema=new Schema({
    text:{
        type:String,
        requuired:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
})

const Todo=mongoose.model("Todo",todoschema);

module.exports=Todo;