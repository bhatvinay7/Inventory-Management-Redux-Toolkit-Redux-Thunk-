import React from "react";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchAllItems,getAllItems,setItemId,getSingleItemData,setEditOrDelete,editOrDeleteItem } from "./itemSlice";
const InventoryTable = ({reference}) => {
  const [sectionRef,ssectionRef]=useState(reference)
  const [deleteWindow,setDeleteWindow]=useState([])
  
  const dispatch=useDispatch()



function handlePopUP(e,index){
  e.preventDefault()
  const newWindow=[...deleteWindow]
  newWindow[index]= !newWindow[index]
  setDeleteWindow(newWindow)
}


  useEffect(()=>{
    dispatch(fetchAllItems())
  },[dispatch])
  const fetchData=useSelector(getAllItems)
    

 
  useEffect(() => {
    
    setDeleteWindow(new Array(fetchData?.length).fill(false));
  }, [fetchData]);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  function handleEditClick(e,id){
   e.preventDefault()
   dispatch(setItemId(id))
   dispatch(getSingleItemData())
   dispatch(setEditOrDelete("edit"))
  }

  function handleDeleteClick(e,id,index){
    e.preventDefault()
   dispatch(setItemId(id))
   dispatch(setEditOrDelete("delete"))
   dispatch(editOrDeleteItem())
   handlePopUP(e, index)
   setTimeout(()=>{
    dispatch(fetchAllItems())
   },4000)
  }

if(fetchData.length==0){
  return <></>
}return (
    <> 
    <table className=" relative w-full  my-4 bg-white shadow rounded-md">
      <thead className="bg-gray-200 w-full ">
        <tr className="md:text-base text-xs">
          <th className="md:p-4 p-1.5 text-left ">Name</th>
          <th className="md:p-4 p-1.5 text-left">Category</th>
          <th className="md:p-4 p-1.5 text-left">Quantity</th>
          <th className="md:p-4 p-1.5 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {fetchData.length>0 &&fetchData.map((item,index) => (
          <tr
            key={item._id}
            className={`border-t hover:bg-gray-300/75 ${
              item.quantity <=20 ? "bg-red-50" : ""
            }`}
          >
            <td className="md:p-4 p-2 md:text-base text-xs">{item.itemName}</td>
            <td className="md:p-4 p-2 md:text-base text-xs">{item?.category}</td>
            <td className="md:p-4 p-2 md:text-base text-xs flex flex-wrap">{item.quantity}{item.quantity <= 20 ? <span className={` ${
               "bg-red-100  text-indigo-950 text-xs items-center justify-center  font-sans ml-2 w-fit p-1 rounded-md " 
            }`} >low quantity!</span>:<></>}</td>

            <td className="p-2 text-center space-x-1">
              <button type="button"
              onClick={(e)=>{handleEditClick(e,item._id)
                          scrollToSection()
              }}
                className="md:px-3 px-1.5 md:py-2 p-1 bg-blue-500 md:text-baese text-xs text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
              type="button"
              onClick={(e)=>{ handlePopUP(e,index)}}
                className="  md:px-3 px-1.5 md:py-2 p-1 md:text-baese text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
                {deleteWindow?.[index] ? (
                      <div
                        className={` fixed   inset-0 md:text-base w-full h-auto text-xs flex items-center justify-center bg-black/60`}
                      >
                        <div className="bg-slate-800 border  border-red-300 p-2 md:p-6  rounded-lg shadow-lg text-center w-fit md:w-2/5  md:h-32">
                          <p className=" w-full text-base md:text-base whitespace-nowrap text-white  font-semibold mb-4">
                            Do you want to delete this item?
                          </p>
                          <div className="flex gap-2 ">
                            <div
                              onClick={(e) => handleDeleteClick(e, item._id,index)}

                              className=" px-1.5 py-1.5 text-xs md:text-base md:px-4 md:py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Yes
                            </div>
                            <div
                              onClick={(e) => handlePopUP(e, index)}
                              className="px-1.5 py-1.5 text-xs md:text-base md:px-4 md:py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                              No
                            </div>
                          </div>
                        </div>
                      </div>
                    ) :<></>}
              </button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </>
  );
};

export default InventoryTable;
