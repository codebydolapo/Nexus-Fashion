import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { Image } from 'react-native';
import { ChevronDownIcon, UserIcon, UserCircleIcon, TrashIcon } from "react-native-heroicons/outline"
import logo from '../assets/images/logo.jpeg'
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { WALLET_CONNECT_ID } from '@env'
import { selectAddress } from '../features/addressSlice';
import { useSelector, useDispatch } from 'react-redux';
import { sepolia, useAccount, useDisconnect, useSwitchNetwork } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { setAddress } from '../features/addressSlice';



const Navbar = () => {

    const { open, isConnected, provider } = useWalletConnectModal()

    const address = useSelector(selectAddress)

    const dispatch = useDispatch()

    function truncateAddress(str) {
        // Check if the string is shorter than 4 characters
        if (str?.length <= 6) {
            // Return the entire string if it's already short enough
            return str;
        } else {
            // Extract the first four characters and add an ellipsis
            return str?.substring(0, 6) + '...';
        }
    }

    const { switchNetwork } = useSwitchNetwork()

    function connect() {
        try {
            if (address && isConnected) {
                dispatch(setAddress(""))
                return provider.disconnect()
            } else
                open()
            // switchNetwork?.(sepolia.id)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View className={`flex-row pb-3 items-center mx-4 space-x-2`}>
            <Image
                source={{ uri: Image.resolveAssetSource(logo).uri }}
                className={`w-7 h-7 bg-gray-300 p-4 rounded-full`}
            />
            <View className={`flex-1`}>
                <Text className={`font-bold text-gray-400 text-xs`}>Nexus Fashion</Text>
                {isConnected ?
                    <View className={`flex-row`}>
                        <Text className={`font-bold text-xl`}>
                            Hello,
                        </Text>
                        {/* <View className={`bg-black rounded-xl p-4 w-10`}> */}
                        <Text className={`text-[#fff] font-bold text-xl bg-black rounded-md pr-2 ml-1 w-26`}> {truncateAddress(address)}</Text>
                        {/* <ChevronDownIcon size={20} color="#483248" /> */}
                        {/* </View> */}
                    </View>
                    :
                    <Text className={`font-bold text-xl`}>
                        Hello, User
                        {/* <ChevronDownIcon size={20} color="#483248" /> */}
                    </Text>
                }
            </View>
            {address && isConnected ?
                <TouchableOpacity className={`w-10 h-10 bg-black rounded-full items-center justify-center`}
                    onPress={connect}
                >
                    <TrashIcon size={20} color="#fff" />
                </TouchableOpacity>
                :
                <TouchableOpacity className={`w-32 h-10 bg-black rounded-lg items-center justify-center`}
                    onPress={connect}
                >
                    <Text className={`text-white font-bold`}>Connect Wallet</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default Navbar