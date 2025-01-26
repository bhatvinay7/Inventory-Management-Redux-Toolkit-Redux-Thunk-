import mongoose from 'mongoose'
import {inventory} from '../model/Inventory.model.js'
const addItem=async(req,res)=>{
    try{

        const body=req.body
        const result= new inventory({
               itemName:body.name,
               category:body.category,
               quantity:body.quantity
        }).save().then(()=>{
            res.status(200).json("Item is added")
        }).catch((err)=>{
            res.status(500).json("network error please try again")
        })
    }
    catch(err){
        res.status(500).json("server error please try again")
    }
}

const editItem=async(req,res)=>{
    try{

        const body=req.body;
        const id=decodeURIComponent(req.query.id)
        const updatedData={name:body.ItemName,category:body.category,quantity:body.quantity}
        const result= await inventory.findByIdAndUpdate(id,updatedData)
        res.status(200).json("item details are successfully  updated")
    }
    catch(err){
        res.status(500).json("server error,unable to update the item details ")
    }
}

const deleteItem=async(req,res)=>{
    try{
        const id=decodeURIComponent(req.query.id);
        const result=await inventory.findByIdAndDelete(id);
        res.status(200).json("Item successfully deleted")
    }
    catch(err){
        res.status(500).json("server error")
    }
}

const fetchData=async(req,res)=>{
    try{
        const { order, category } = req.query;
          let query = {};
        if (category) {
       query.category = category;
      }
  const sortOrder = order === "ascending" ? 1 : -1;

  const result = await inventory.find(query).sort({ quantity: sortOrder });

        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json("Internal server error")
    }
}
const allCategory=async(req,res)=>{
    try{
       const search=decodeURIComponent(req.query.search)
        const result=await inventory.aggregate([
              {
                $match: {
                  category: { $regex:`.*${search}.*`,$options: 'i' }
                }
              },
              {
                
                    $group: { _id: "$category" } 
                
              },
              {
                $project: {
                  _id: 1,
                  category: 1
                }
              }
            ]
          )
          res.status(200).json(result);
    }
    catch(err){
        res.status(500).json("Internal server error")
    }
          
}
const getSingleDataBasedOnId=async(req,res)=>{
    try{ 
        //const id=mongoose.Types.ObjectId(req.query.id)
         const newid=decodeURIComponent(req.query.id);
        
         const result=await inventory.findById(newid)
        
         res.status(200).json(result)
    }
    catch(err){
        res.status(500).json("Internal server error")
    }
}
const getdata_BasedOn_category=async(req,res)=>{
    try{

        const category=decodeURIComponent(req.body.query.category);
        const result=await inventory.find({category:category})
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json("Internal server error");
    }
}
export {addItem,editItem,deleteItem,fetchData,allCategory,getSingleDataBasedOnId,getdata_BasedOn_category}