import React from "react";
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { changeSortOrder, fetchAllItems, allCategory, getallCategory, setSearchQuery, setCategory } from './itemSlice'
import { useDispatch, useSelector } from "react-redux";
const FilterAndSort =({SlideBar,visible})=>{
    const [sortOrder, setSortOrder] = useState("ascending")
    const [clearFilter, setClearFilter] = useState(false)
    const dispatch = useDispatch()
    const category = useSelector(getallCategory)

    const [search, setSearch] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        const t = setTimeout(() => {
            if (text) {
                setSearch(text)
            }
        }, 400)
        return () => {
            clearTimeout(t)
        }
    }, [text])

    useEffect(() => {
        if (search) {
            dispatch(setSearchQuery(search))
            dispatch(allCategory())
        }
    }, [dispatch, search])

    useEffect(() => {
        dispatch(changeSortOrder(sortOrder))
        dispatch(fetchAllItems())

    }, [sortOrder, clearFilter, dispatch])

    function selectCategory(category) {
        dispatch(setCategory(""))
        setText(category)
        dispatch(setSearchQuery(category))
        dispatch(fetchAllItems())
        //   setText("")
        //   dispatch(setSearchQuery(""))

    }
   
    return (
        <>
        {visible ?
            <div className="absolute z-20 md:hidden  flex inset-0 top-0 md:top-28 bg-slate-500  w-full px-2   flex-col justify-start  min-h-screen ">
                      
            <div onClick={()=>SlideBar(!visible)} className="w-full md:hidden flex justift-start m-3">
            <FontAwesomeIcon className="text-xl hover:text-red-500 " icon={faXmark} />
            </div>
           <div className="flex flex-col">
               <label className="mr-2 px-2 py-1.5 text-base ">Sort by Quantity:</label>
               <select
                   value={sortOrder}
                   onChange={(e) => setSortOrder(e.target.value)}
                   className="p-2 m-1 border rounded">

                   <option value="ascending">Ascending</option>
                   <option value="descending">Descending</option>
               </select>
           </div>
           <div className="mb-4 w-full">
               <label className="mr-2 px-4 py-1.5 text-base ">Filter by Category:</label>
               <input
                   type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   className="p-2 m-1 border rounded w-full"
                   placeholder="search here"
               />
               <div className="h-auto w-full bg-white/75  ">
                   {category ? category.map((each) => {
                       return (
                           <div onClick={() => { selectCategory(each._id) }} className="hover:bg-teal-400/75 w-full p-2 " key={each._id}>{each._id}</div>
                       )
                   }) : <></>}
               </div>
           </div>
           <button  className="py-1.5 px-2 md:p-1.5 w-fit rounded-md text-base bg-yellow-300 border border-slate-900 "type="button"
            onClick={()=>{
               setClearFilter(!clearFilter)
               setText("")
               dispatch(setCategory(""))
               dispatch(setSearchQuery(""))
           }}>clear filter</button>
       </div>           
            
            :<></>}


<div className="hidden md:fixed  md:flex inset-0 top-0 md:top-28 bg-slate-500 md:w-1/4 w-1/2 px-2   flex-col justify-start  min-h-screen ">
           <div className="flex flex-col w-full">
               <label className=" p-1">Sort by Quantity:</label>
               <select
                   value={sortOrder}
                   onChange={(e) => setSortOrder(e.target.value)}
                   className="p-2 m-1 border rounded !w-full ">

                   <option value="ascending">Ascending</option>
                   <option value="descending">Descending</option>
               </select>
           </div>
           <div className="mb-2 w-full ml-1">
               <label className=" p-2">Filter by Category:</label>
               <input
                   type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   className="p-1.5 mb-1 border rounded w-full"
                   placeholder="search here"
               />
               <div className="w-full rounded-md bg-white h-auto overflow-hidden">

               
               <div className="h-auto w-full  bg-white/75  ">
                   {category ? category.map((each) => {
                       return (
                           <div onClick={() => { selectCategory(each._id) }} className="hover:bg-teal-400/75 text-black/60 w-full p-2 " key={each._id}>{each._id}</div>
                       )
                   }) : <></>}
               </div>
               </div>
           </div>
           <button  className="p-1.5 ml-1 md:p-1.5 w-fit rounded-md bg-yellow-300 border hover:bg-yellow-300/45 border-slate-900 "type="button"
            onClick={()=>{
               setClearFilter(!clearFilter)
               setText("")
               dispatch(setCategory(""))
               dispatch(setSearchQuery(""))
           }}>clearFilter</button>
       </div>         

       </>
    );
};

export default FilterAndSort;
