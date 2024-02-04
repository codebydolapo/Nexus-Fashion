import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import * as Progress from "react-native-progress"
import { useNavigation} from '@react-navigation/native'
import useBuyItems from './hooks/useBuyItems'
import { useDispatch } from 'react-redux'
import { clearBasket } from '../features/basketSlice'

const PreparingOrderScreen = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const { payFunc } = useBuyItems()

  // useEffect(()=>{
  //   setTimeout(async () => {
  //     try {
  //       console.log("hello")
  //       await payFunc?.()
  //     }
  //     catch (error) {
  //       console.log(error)
  //       navigation.navigate("Basket")
  //     }
  //   }, 4000)
  // }, [])
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearBasket())
      navigation.navigate("Home")
    }, 4000)
  }, [])

  function payForGoods() {
    setTimeout(() => {
      try {
        payFunc?.()
      }
      catch (error) {
        console.log(error)
        navigation.navigate("Basket")
      }
    }, 4000)
  }

  return (
    <SafeAreaView className={`bg-[#133957] flex-1 justify-center items-center px-4`}>
      <Animatable.Image
        source={require("../assets/loading.gif")}
        animation={"slideInUp"}
        iterationCount={1}
        className={`w-full`}
      />

      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className={`text-lg my-10 text-white font-bold text-center`}
      >
        Loading Payment Infrastructure
      </Animatable.Text>

      <Progress.Bar size={60} indeterminate={true} color={"white"} />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen