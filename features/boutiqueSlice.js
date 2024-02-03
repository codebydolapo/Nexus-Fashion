import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  boutique: {
    id: null, 
    imgUrl: null, 
    title: null, 
    rating: null, 
    genre: null, 
    address: null, 
    short_description: null, 
    dishes: null
  }
}

export const boutiqueSlice = createSlice({
  name: 'boutique',
  initialState,
  reducers: {
    setBoutique: (state, action) => {
      state.boutique = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setBoutique } = boutiqueSlice.actions

export const selectBoutique = (state) => { 
  // console.log(state.boutique.boutique)
  return state.boutique.boutique
}


export default boutiqueSlice.reducer