import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Touchable } from 'react-native'
import React, { useLayoutEffect, useMemo, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux';
import { selectBoutique } from '../features/boutiqueSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import rider from '../assets/icons/rider.jpg'
import matic from "../assets/images/matic.png"
import { TrashIcon } from 'react-native-heroicons/solid';
import { selectAddress } from '../features/addressSlice';



const BasketScreen = () => {

  //allows me to control what the nav bar looks like
  const navigation = useNavigation();
  const boutique = useSelector(selectBoutique)
  const { items } = useSelector(selectBasketItems)
  const dispatch = useDispatch()
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  let basketTotal = useSelector(selectBasketTotal)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  // useEffect(() => {
  //   console.log(boutique.title)
  // }, [])

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      // console.log(results)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])


  const address = useSelector(selectAddress)

  const handleNavigation = () => {
    if (address) {
      navigation.navigate("PreparingOrder")
    } else {
      navigation.navigate("ConnectWallet")
    }
  }


  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <View className={`flex-1 bg-gray-100`}>
        <View className={`p-5 bg-white shadow-xs`}>

          <View>
            <Text className={`text-lg font-bold text-center`}>Basket</Text>
            <Text className={`text-center text-gray-400`}>{boutique.title}</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className={`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon size={50} color={`#8247e5`} />
          </TouchableOpacity>

        </View>

        <View className={`flex-row items-center items-x-4 px-4 py-3 bg-white my-5`}>
          <Image
            source={{ uri: Image.resolveAssetSource(rider).uri }}
            className={`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
          <Text className={`flex-1 mx-2`}>Deliver in 30 mins</Text>
          <TouchableOpacity>
            <Text className={`text-[#8247e5]`}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className={`divide-y divide-gray-200`}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <View key={key} className={`flex-row items-center space-x-2 bg-white py-2 px-5`}>
                <Text className={`text-[#8247e5] font-bold`}>{items?.length}X</Text>
                <Image
                  source={{ uri: Image.resolveAssetSource(items[0]?.image).uri }}
                  className={`h-12 w-12 rounded-full`}
                />
                <Text className={`flex-1`}>{items[0]?.name}</Text>
                <View className={`flex-row items-center justify-center px-2 rounded-lg`}>
                  <Text className={`text-sm py-1 `}>{items[0]?.price.toFixed(2)}</Text>
                  <Image
                    source={{ uri: Image.resolveAssetSource(matic).uri }}
                    className={`h-5 w-5 mx-1 `}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <TrashIcon size={20} color={"gray"} />
                </TouchableOpacity>
              </View>
            )

          })}
        </ScrollView>

        <View className={`p-5 bg-white mt-5 space-y-4`}>
          <View className={`flex-row justify-between`}>
            <Text className={`text-gray-400`}>Subtotal</Text>
            <View className={`flex-row items-center justify-center px-2 rounded-lg`}>
              <Text className={`text-sm py-1 text-gray-400 `}>{items[0]?.price.toFixed(2)}</Text>
              <Image
                source={{ uri: Image.resolveAssetSource(matic).uri }}
                className={`h-5 w-5 mx-1 `}
              />
            </View>
          </View>


          <View className={`flex-row justify-between`}>
            <Text className={`text-gray-400`}>Delivery-Fee</Text>
            <View className={`flex-row items-center justify-center px-2 rounded-lg`}>
              <Text className={`text-sm py-1 text-gray-400 `}>0.99</Text>
              <Image
                source={{ uri: Image.resolveAssetSource(matic).uri }}
                className={`h-5 w-5 mx-1 `}
              />
            </View>
          </View>

          <View className={`flex-row justify-between`}>
            <Text className={`text-gray-400`}>Overall Total</Text>
            <View className={`flex-row items-center justify-center px-2 rounded-lg`}>
              <Text className={`text-xl py-1 text-green-600 font-extrabold `}>{(basketTotal + 0.99).toFixed(2)}</Text>
              <Image
                source={{ uri: Image.resolveAssetSource(matic).uri }}
                className={`h-5 w-5 mx-1 `}
              />
            </View>
          </View>

          <TouchableOpacity className={`rounded-lg p-4 bg-[#8247e5]`} onPress={``}>
            {/* <TouchableOpacity className={`rounded-lg p-4 bg-[#8247e5]`} onPress={handleNavigation}> */}
            <Text className={`text-center text-white text-lg font-bold`}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen