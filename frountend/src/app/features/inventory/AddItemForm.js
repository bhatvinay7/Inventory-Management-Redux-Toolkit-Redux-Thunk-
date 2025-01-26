import React, { useEffect, useState,useRef } from "react";
import InventoryTable from "./ShowItemTable.js";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, getAddStatus,getsingleItemData,geteditOrdelete,setEditOrDelete, updateAddStatus, addItem,editOrDeleteItem,getEditOrDeleteStatus } from "./itemSlice.js";

const AddItemForm = () => {
  const ref=useRef(null)
  const [edit_deleteStatus,setEditOrDeleteStatus]= useState("")
  const addStatus = useSelector(getAddStatus);
  const editOrdelete=useSelector(geteditOrdelete) // Use Redux state directly
  const singleItemData=useSelector(getsingleItemData)
  const editOrdeleteStatus=useSelector(getEditOrDeleteStatus)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", category: "", quantity: 0, id: null });
  const enable = formData.name && formData.category && formData.quantity >= 0;
   
  useEffect(()=>{
     if(editOrdeleteStatus!="idle"){
      setEditOrDeleteStatus(editOrdeleteStatus)
     }
  },[dispatch,editOrdeleteStatus])
  useEffect(() => {
    if (singleItemData) {
      setFormData({
        name: singleItemData.itemName || "",
        category: singleItemData.category || "",
        quantity: singleItemData.quantity || 0,
        id: singleItemData.id || null,
      });
    }
  }, [singleItemData]);

  useEffect(() => {
    if (addStatus === "succeeded" || addStatus === "failed" ||edit_deleteStatus!="" ) {
      const timeout = setTimeout(() => {
        dispatch(updateAddStatus("idle"));
        setEditOrDeleteStatus("")
      }, 6000);

      return () => clearTimeout(timeout); // Clean up timeout
    }
  }, [addStatus,edit_deleteStatus, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(enable && editOrdelete=="edit"){
      console.log(editOrdelete)
     dispatch(addItem(formData));
     dispatch(editOrDeleteItem())       
    }
    else if (enable) {
      dispatch(addItem(formData));
      dispatch(updateAddStatus("loading"));
      dispatch(addNewItem());
      //setFormData({ name: "", category: "", quantity: 0, id: null });
    }

  };

  return (
    <>
    <form ref={ref}
      onSubmit={handleSubmit}
      className=" h-auto  w-full lg:w-3/4 mt-2 p-3 bg-black/45 shadow rounded-lg"
    >
      <div>
        <label className="block font-medium text-white">Item Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter item name"
        />
      </div>
      <div>
        <label className="block font-medium text-white">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter category"
        />
      </div>
      <div>
        <label className="block font-medium text-white">Quantity</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter quantity"
        />
      </div>
      <div className="mt-4">
        {edit_deleteStatus?<span className="text-green-600 text-center">{edit_deleteStatus}</span>:<></>}
        {addStatus === "loading" && <span className="text-green-600 text-center">Adding new item...</span>}
        {addStatus === "succeeded" && <span className="text-green-600 text-center">Item added successfully!</span>}
        {addStatus === "failed" && <span className="text-red-600 text-center">Failed to add the item.</span>}
      </div>
      <button
        type="submit"
        disabled={!enable}
        className={`w-full py-2 mt-6 ${
          enable ? "bg-yellow-300/75 hover:bg-yellow-300/60" : "bg-gray-300 cursor-not-allowed"
        } text-indigo-800 rounded`}
      >
        Add Item
      </button>
    </form>
    <div className="w-full h-auto p-2">

     <InventoryTable
     reference={ref}
            /> 
    </div>
   </>         
  );
};

export default AddItemForm;
