// THIS COMPONENT SHOWS UP ON THE HOME PAGE, AND HOLDS THE IMAGE AND DATA OF THE BOUTIQUES
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'


const BoutiqueCard = ({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity className={`bg-white mr-3 shadow rounded-xl `}
            onPress={() => {

                navigation.navigate("Boutiques", {
                    id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
                })

            }}
        >
            <Image
                source={{ uri: Image.resolveAssetSource(imgUrl).uri }}
                className={`w-64 h-64 rounded-t-xl`}
            />
            <View className={`px-3 pb-4`}>
                <Text className={`font-bold text-lg pt-2`}>{title}</Text>
                <View className={`flex-row items-center space-x-1`}>
                    <StarIcon color="green" opacity="0.5" size="22" />
                    <Text className={`text-gray-500`}>{rating} - {genre}</Text>
                </View>
                <View className={`flex flex-row items-center space-x-1`}>
                    <MapIcon color="gray" opacity="0.4" size="22" />
                    <Text className={`text-xs text-gray-500`}>Nearby - {address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BoutiqueCard