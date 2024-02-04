import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)

      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Cannot remove item with id ${action.payload.id}, as it is not in the basket`)
      }
      state.items = newBasket
    },
    clearBasket: (state, action) => {
      state.items = []
    }

  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions
// export const selectBasketItems = state => state.basket.items
export const selectBasketItems = (state) => state.basket

export const selectBasketItemsWithId = (state, id) =>
  createSelector(
    selectBasketItems, // Use the existing selector for basket items
    (items) => items.filter(
      (item) => {
        item.id === id // Filter based on ID
      }
    )
  )(state);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => {
  return total += item.price
}, 0)

export default basketSlice.reducer

