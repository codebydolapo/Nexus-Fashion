import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { useSelector } from 'react-redux';
import { selectAddress } from '../features/addressSlice';


const ConnectWalletScreen = () => {

    const { open, close, isConnected, provider } = useWalletConnectModal()

    //allows me to control what the nav bar looks like
    const navigation = useNavigation();

    const address = useSelector(selectAddress)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        if (address) {
            navigation.navigate("Basket")
        }
    }, [])

    return (
        <SafeAreaView className={`w-full flex-1 items-center justify-center bg-[#f5f8ff]`}>

            {/* <View className={`border-2 border-green-700`}> */}
            <Animatable.Image
                source={require("../assets/connect_.gif")}
                animation={"slideInUp"}
                iterationCount={1}
                className={`h-[45%]`}
            />
            {/* </View> */}

            <Animatable.Text
                animation={"slideInUp"}
                iterationCount={1}
                className={`text-xl mb-2 text-black font-bold text-center`}
            >
                Uh-Oh... Connect Your Wallet!
            </Animatable.Text>

            <Animatable.Text
                animation={"slideInUp"}
                iterationCount={1}
                className={`text-md mb-10 text-black font-bold text-center`}
            >
                You might have to connect your wallet to access the order feature
            </Animatable.Text>

            <View className={`h-[30%] w-full items-center justify-center `}>

                <TouchableOpacity className={`w-56 h-12 bg-black rounded-lg items-center justify-center my-3`}
                    onPress={() => open()}
                >
                    <Text className={`text-white font-bold`}>Connect Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity className={`w-56 h-12 border-2 border-black rounded-lg items-center justify-center my-3`}
                    onPress={() => navigation.goBack()}
                >
                    <Text className={`text-black font-bold`}>Go Back</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default ConnectWalletScreen