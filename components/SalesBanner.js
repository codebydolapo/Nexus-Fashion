//THIS IS THE ROW ON THE HOMEPAGE THAT HOLDS THE CARDA OF THE BOUTIQUES IN THEIR RESPECTIVE "FEATURED" CATEGORIES
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import banner from '../assets/images/banner.jpg'
import { ArrowRightIcon, ChevronRightIcon} from 'react-native-heroicons/solid'

const SalesBanner = ({ title, description }) => {

    return (
        <View className={`bg-white`}>
            <View className={`mt-4 flex-row items-center justify-between px-4`}>
                <Text className={`font-bold text-lg`}>Hottest Deal</Text>
                <ChevronRightIcon color="#00CCBB" />
            </View>
            <Image
                source={{ uri: Image.resolveAssetSource(banner).uri }}
                className={`h-36 p-4 m-4 bg-white`}
            />
        </View>
    )
}

export default SalesBanner