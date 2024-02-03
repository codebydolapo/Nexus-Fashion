import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux';
import { selectBoutique } from '../features/boutiqueSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core'
import { XCircleIcon} from 'react-native-heroicons/solid';
import * as Progress from "react-native-progress"
import MapView, { Marker } from 'react-native-maps'
import dom from '../assets/images/dom.png'
import * as Animatable from 'react-native-animatable'



const DeliveryScreen = () => {

  //allows me to control what the nav bar looks like
  const navigation = useNavigation();
  const boutique = useSelector(selectBoutique)


  return (
    <View className={`bg-[#133957] flex-1`}>
      <SafeAreaView className={`z-50`} >
        <View className={`flex-row justify-between items-center p-5`}>
          <TouchableOpacity
            onPress={()=>navigation.navigate("Home")}
            className={`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon size={30} color={`#8247e5`} />
          </TouchableOpacity>
          <Text className={`font-light text-white font-large`}>Order Help</Text>
        </View>


        <View className={`bg-white mx-5 my-2 rounded-md z-50 p-6 shadow-md`}>
          <View className={`flex-row justify-between`}>
            <View>
              <Text className={`text-lg text-gray-400`}>Estimated Arrival</Text>
              <Text className={`text-4xl font-bold`}>Order Help</Text>
            </View>
            <Animatable.Image
              source={require("../assets/riderGif.gif")}
              className={`w-20 h-20 rounded-full`}
            />
          </View>
          <Progress.Bar size={60} indeterminate={true} color={"white"} />

          <Text className={`mt-3 text-gray-500`}>
            Your order from {boutique.title} is being packaged
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: boutique.lat,
          longitude: boutique.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        mapType='mutedStandard'
        className={`flex-1 -mt-10 z-0`}
      >
        <Marker
          coordinate={{
            latitude: boutique.lat,
            longitude: boutique.long,
          }}
          title={`${boutique.title}`}
          description={`${boutique.short_description}`}
          identifier='origin'
          pinColor='#8247e5'
        />
      </MapView>

      <SafeAreaView className={`bgwhite flex-row items-center space-x-5 h-28`}>
        <Image
          source={{ uri: Image.resolveAssetSource(dom).uri }}
          className={`w-12 h-12 bg-gray-300 p-4 rounded-full ml-5`}
        />
        <View className={`flex-1`}>
          <Text className={`text-lg`}>Dom Toretto</Text>
          <Text className={`text-gray-400`}>Your rider</Text>
        </View>

        <Text className={`text-[#8247e5] text-lg mr-5 font-bold`}>Call?</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen