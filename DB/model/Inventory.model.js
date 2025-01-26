import mongoose from 'mongoose'
const inventorySchema=mongoose.Schema({
    itemName:{type:String},
    category:{
        type:String,
    },
    quantity:{type:Number}

},{timestamps:true})

const inventory=mongoose.model('inventoey',inventorySchema);
export  {inventory};