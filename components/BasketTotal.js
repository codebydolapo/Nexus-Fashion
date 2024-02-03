import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import matic from "../assets/images/matic.png"
import { selectAddress } from '../features/addressSlice'


const BasketTotal = () => {


    const { items } = useSelector(selectBasketItems)

    const navigation = useNavigation()

    const total = useSelector(selectBasketTotal)

    


    return (
        <View className={`absolute bottom-7 w-full z-50`} >
            <TouchableOpacity onPress={()=>navigation.navigate("Basket")} className={`bg-[#8247e5] mx-5 p-4 rounded-lg flex-row items-center space-x-1`}>
                <Text className={`text-white font-extrabold text-lg py-1 px-2 rounded-lg`}>{items.length}</Text>
                <Text className={`flex-1 text-white font-extrabold text-lg text-center`}>View Basket</Text>
                <View className={`flex-row items-center justify-center bg-[#572e9e] px-2 rounded-lg`}>
                    <Text className={`text-white font-extrabold text-lg py-1 `}>{total.toFixed(2)}</Text>
                    <Image
                        source={{ uri: Image.resolveAssetSource(matic).uri }}
                        className={`h-5 w-5 mx-1 `}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default BasketTotal