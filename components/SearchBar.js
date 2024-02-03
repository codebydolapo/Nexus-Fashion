import { View, TextInput } from 'react-native'
import React from 'react'
import { AdjustmentsVerticalIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"

const SearchBar = () => {
  return (
    <View className={`flex-row items-center space-x-2 pb-2 mx-4`}>
                <View className={`flex-row space-x-2 flex-1 bg-gray-200 p-3`}>
                    <MagnifyingGlassIcon color = 'gray' size = {20} />
                    <TextInput 
                    placeholder='Online stores and clothing'
                    keyboardType='default'
                    />
                </View>

                <AdjustmentsVerticalIcon color='#00CCBB' />
            </View>

  )
}

export default SearchBar