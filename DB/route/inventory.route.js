import express from 'express';
const router=express.Router();
import {addItem,editItem,deleteItem,fetchData,allCategory,getdata_BasedOn_category,getSingleDataBasedOnId} from '../controler/Inventory.controler.js';
router.post('/postItem',addItem)
router.get('/getAllItem',fetchData)
router.patch('/updateItem',editItem)
// router.post('/changeOrder',);
router.get('/getDataBasedOnCategory',getdata_BasedOn_category)
router.delete('/deleteItem',deleteItem);
router.get('/allCategory',allCategory)
router.get('/getSingleDataBasedOnId',getSingleDataBasedOnId)
export default  router

