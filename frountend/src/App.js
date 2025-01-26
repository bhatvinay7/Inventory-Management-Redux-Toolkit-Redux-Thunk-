import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AddItemForm from "./app/features/inventory/AddItemForm.js";
import FilterAndSort from "./app/features/inventory/FilterAndSort.js";

const App = () => {
  const [visible,setSlideBar]=useState(false)
  return (
    <div className="min-h-screen relative h-full  w-full ">
      <header className="w-full h-16 md:h-28 fixed flex items-center z-40 bg-white shadow-md shadow-black/25 ">
      <h1 className=" text-xl md:text-3xl w-fit m-auto font-bold text-center text-gray-800 mb-6">
        Inventory Management
      </h1>

      </header>
     <div className=" relative md:block top-16 md:top-28 w-full bg-indigo-950/75 flex-col  flex min-h-screen justify-start  h-full  ">
         <FilterAndSort
         visible={visible}
        SlideBar={setSlideBar}
          
        /> 

        <div className=" relative flex p-2 flex-col w-full  md:left-1/4 md:w-3/4 bg-indigo-950/75 min-h-screen  h-auto ">
     <div onClick={()=>setSlideBar(!visible)} className="m-3 md:hidden w-fit bg-white px-4 py-1.5 rounded-sm ">
               Filter
       </div>  

        <AddItemForm  />
       
        </div>
      </div>
    </div>
  );
};

export default App;

