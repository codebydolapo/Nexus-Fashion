import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import boutiqueReducer from './features/boutiqueSlice'
import addressReducer from './features/addressSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    boutique: boutiqueReducer,
    address: addressReducer
  },
})