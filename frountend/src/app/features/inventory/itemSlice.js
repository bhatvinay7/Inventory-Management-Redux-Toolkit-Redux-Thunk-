import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../fetch/axios.js";
export const fetchAllItems = createAsyncThunk(
    'Items/fetchAllItems',
    async (_, thunkAPI) => {
      try {
        const state=thunkAPI.getState();

        const response = await axiosInstance.get(`/api/getAllItem?order=${state.Items.order}&category=${encodeURIComponent(state.Items.searchCategory)}`);
  
        // Return a custom success payload
        return thunkAPI.fulfillWithValue({
          status: response.data,
        });
      } catch (error) {
        // Return a custom error payload
        return thunkAPI.rejectWithValue({
          message: error.response?.data
        });
      }
    }
  );

  export const addNewItem= createAsyncThunk(
    'Items/addNewItem',
    async (payload,thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        console.log(state.Items.item)
        const response = await axiosInstance.post('/api/postItem',state.Items.item);
   
        // Return a custom success payload
        return thunkAPI.fulfillWithValue({
          response:response?.data
        });
      } catch (error) {
        // Return a custom error payload
        return thunkAPI.rejectWithValue({
          message: error.response?.data
        });
      }
    }
  );  

export const editOrDeleteItem= createAsyncThunk(
    'Items/editOrDeleteItem',
    async (payload, thunkAPI) => {
      try {
        const state=thunkAPI.getState()
        const id=state.Items?.id
        const option=state.Items.editOrdelete
        let response='';
        if(option=='delete'){

            response = await axiosInstance.delete(`/api/deleteItem?id=${encodeURIComponent(id)}`);
        }
        else if(option=='edit'){
            response = await axiosInstance.patch(`/api/updateItem?id=${encodeURIComponent(id)}`,state.Items.item);
        }

  
        // Return a custom success payload
        return thunkAPI.fulfillWithValue({
          status: response.data,
        });
      } catch (error) {
        // Return a custom error payload
        return thunkAPI.rejectWithValue({
          message: error.response?.data
        });
      }
    }
  );  

  export const getSingleItemData= createAsyncThunk(
    'Items/getSingleItemData',
    async (payload,thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const response = await axiosInstance.get(`/api/getSingleDataBasedOnId?id=${encodeURIComponent(state.Items.id)}`);
   
        // // Return a custom success payload
        return thunkAPI.fulfillWithValue({
          response:response?.data
        });
      } catch (error) {
        // Return a custom error payload
        return thunkAPI.rejectWithValue({
          message: error.response?.data
        });
      }
    }
  );  

  export const allCategory= createAsyncThunk(
    'Items/allCategory',
    async (payload,thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const response = await axiosInstance.get(`/api/allCategory?search=${encodeURIComponent(state.Items.searchCategory)}`);
   
        // // Return a custom success payload
        return thunkAPI.fulfillWithValue({
           
         category:response?.data
        });
      } catch (error) {
        // Return a custom error payload
        return thunkAPI.rejectWithValue({
          message: error.response?.data
        });
      }
    }
  );  

  export const getdata_BasedOn_category= createAsyncThunk(
    'Items/getdata_BasedOn_category',
    async (payload,thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const response = await axiosInstance.post(`/api/getdata_BasedOn_category?category=${encodeURIComponent(state.Items.category)}`);
   
        // // Return a custom success payload
        return thunkAPI.fulfillWithValue({
            response:response?.data
        });
      } catch (error) {
        // Return a custom error payload
        return thunkAPI.rejectWithValue({
          message: error.response?.data
        });
      }
    }
  );  

const initialState = {
    items: [],
    item:{},
    fetchstatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    addStatus:"idle",
    editOrdeleteStatus:'idle',
    editOrdelete:null,//"edit" | "delete"
    order:"",
    id:null,
    category:null,
    searchCategory:"",
    error: null
}


const itemSlice = createSlice({
    name:'Items',
    initialState,
    reducers: {
        addItem: {
            reducer(state, action) {
                state.item=action.payload
            },
            prepare({name, category,quantity,id}) {
                return {
                    payload: {
                        name:name,
                        category:category,
                        quantity:Number(quantity)||0,
                        id:id

                    }
                }
            }
        },
        updateAddStatus:(state,action)=>{

          state.addStatus=action.payload
        },
        changeSortOrder:(state,action)=>{
          state.order=action.payload
        },
        setItemId:(state,action)=>{
          state.id=action.payload
        },
        setEditOrDelete:(state,action)=>{
          state.editOrdelete=action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchCategory=action.payload
          },
        setCategory:(state,action)=>{
            state.category=action.payload
          }, 
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllItems.pending, (state, action) => {
                state.fetchstatus = 'loading'
            })
            .addCase(fetchAllItems.fulfilled, (state, action) => {
                state.fetchstatus = 'succeeded'
                state.items = action.payload.status
            })
            .addCase(fetchAllItems.rejected, (state, action) => {
                state.fetchstatus= 'failed'
                state.error = action.error.message
            })
            .addCase(addNewItem.pending, (state, action) => {
                state.addStatus = 'loading'
            })
        
            .addCase(addNewItem.fulfilled, (state, action) => {
                state.addStatus = 'succeeded'
                state.item={}
            })
            .addCase(addNewItem.rejected, (state, action) => {
                state.addStatus = 'failed'
                state.error = action.error.message
            }).addCase(editOrDeleteItem.pending, (state, action) => {
                state.editOrdeleteStatus = 'loading'
            })
            .addCase(editOrDeleteItem.fulfilled, (state, action) => {
                state.editOrdeleteStatus=action.payload.status
                state.item={}
                state.editOrdelete=null
                //state.item=action.payload.status
            })
            .addCase(editOrDeleteItem.rejected, (state,action) => {
                state.editOrdeleteStatus =action.payload.status
                state.item={}
                state.editOrdelete=null
                state.error = action.error.message
            }).addCase(getSingleItemData.pending, (state, action) => {
                state.fetchstatus = 'loading'
            }).addCase(getSingleItemData.fulfilled, (state, action) => {
                state.fetchstatus = 'succeeded'
                state.item=action.payload.response
            })
            .addCase(getSingleItemData.rejected, (state, action) => {
                  state.fetchstatus = 'failed'
                state.error = action.error.message
            }).addCase(allCategory.pending, (state, action) => {
               // state.fetchstatus = 'loading'
            }).addCase(allCategory.fulfilled, (state, action) => {
               // state.fetchstatus = 'succeeded'
                state.category=action.payload.category
            })
            .addCase(allCategory.rejected, (state, action) => {
                  //state.fetchstatus = 'failed'
                state.error = action.error.message
            }).addCase(getdata_BasedOn_category.pending, (state, action) => {
                state.fetchstatus = 'loading'
             }).addCase(getdata_BasedOn_category.fulfilled, (state, action) => {
                 state.fetchstatus = 'succeeded'
                 state.items=action.payload.response
             })
             .addCase(getdata_BasedOn_category.rejected, (state, action) => {
                   state.fetchstatus = 'failed'
                 state.error = action.error.message
             })
            

    }
})
export const getAllItems = (state) => state.Items.items;
//export const getAddError = (state) => state.Items.error;
export const geteditOrdelete=(state) => state.Items.editOrdelete;
export const getsingleItemData=(state)=>state.Items.item
export const getAddStatus = (state) => state.Items.addStatus;
export const getFetchStatus = (state) => state.Items.fetchstatus;
export const getEditOrDeleteStatus = (state) => state.Items.editOrdeleteStatus;
export const getallCategory=(state)=>state.Items.category
//export const setEditOrDelete = (state) => state.Items.editOrdelete;
export const {addItem,updateAddStatus,changeSortOrder,setItemId,setEditOrDelete,setSearchQuery,setCategory} = itemSlice.actions
export default itemSlice.reducer