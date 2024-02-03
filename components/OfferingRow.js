import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'
import matic from "../assets/images/matic.png"
import { StarIcon } from 'react-native-heroicons/solid'

const OfferingRow = ({ id, name, description, price, image, rating }) => {

  const [isPressed, setIsPressed] = useState(false)

  const basket = useSelector((state, id) => { return selectBasketItems(state, id) })

  const items = useMemo(() => {
    return basket?.items?.filter((item) => {
      return item.id === id
    })
  }, [id, basket])

  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image, rating }))
  }

  const removeItemFromBasket = () => {
    if (!items.length > 0) return
    dispatch(removeFromBasket({ id }))
  }


  return (
    <>

      <TouchableOpacity className={`bg-white border p-4 border-t-0 border-gray-200 ${isPressed && "border-b-0"}`}
        onPress={() => { setIsPressed(!isPressed) }}>
        <View className={`flex-row `}>
          <View className={``}>
            <Image
              style={{
                borderWidth: 0,
                borderColor: "#FFF"
              }}
              source={{ uri: Image.resolveAssetSource(image).uri }}
              className={`h-20 w-20 bg-gray-300 p-4 rounded-lg`}
            />
          </View>
          <View className={`flex-1 pl-5`}>
            <Text className={`text-base font-bold mb-1`}>{name} #{id}</Text>
            <Text className={`text-gray-400`}>{description}</Text>
            <View className={`flex-row items-end `}>
              <Text className={`text-gray-400 mt-2 font-bold`}>~{price}</Text>
              <Image
                style={{
                  // borderWidth: 1,
                  // borderColor: "#000",
                  // marginLeft: "2px",
                  // margin: "2px"
                }}
                source={{ uri: Image.resolveAssetSource(matic).uri }}
                className={`h-5 w-5 mx-1 `}
              />
              <Text className={`text-gray-400 mx-2`}>|</Text>
              <StarIcon color="#FDCC0D" size={20} className={`mx-2`} />
              <Text className={`text-gray-400 mt-2`}>{rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {isPressed &&
        <View className={`bg-white px-4`}>
          <View className={`flex-row items-center space-x-2 pb-3`}>

            <TouchableOpacity className={``}  onPress={removeItemFromBasket} disabled = {!items.length}>
              <MinusCircleIcon size={40} color={`${items.length == 0 ? "gray": "#800080"}`} />
            </TouchableOpacity>

            <Text className={``}>{items.length}</Text>

            <TouchableOpacity className={``} onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color= "#800080" />
            </TouchableOpacity>

          </View>
        </View>
      }
    </>
  )
}

export default OfferingRow