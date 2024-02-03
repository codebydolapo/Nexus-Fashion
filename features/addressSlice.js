import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: ""
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setAddress } = addressSlice.actions

export const selectAddress = (state) => { 
  return state.address.address
}


export default addressSlice.reducer