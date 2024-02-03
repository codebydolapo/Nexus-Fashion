import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Highlights = ({image}) => {
  return (
    <View className = {`w-28 h-28 mx-2 border-2 border-gray-500 items-center justify-center rounded-full`}>
         <Image
                source={{uri: Image.resolveAssetSource(image).uri}} 
                className={`w-full h-full rounded-full`}
        />
    </View>
  )
}

export default Highlights