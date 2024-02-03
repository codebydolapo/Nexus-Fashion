import { ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import SalesBanner from '../components/SalesBanner';
import { useDispatch } from 'react-redux';
import { useWalletConnectModal, WalletConnectModal } from "@walletconnect/modal-react-native";
import { useEffect } from 'react';
import { WALLET_CONNECT_ID } from '@env'
import { polygonMumbai, sepolia } from 'wagmi/chains';
import {
    createWeb3Modal,
    defaultWagmiConfig,
} from '@web3modal/wagmi-react-native';
import { setAddress } from '../features/addressSlice';



const HomePage = () => {
    const dispatch = useDispatch()

    //allows me to control what the nav bar looks like
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    // MY WAGMI PROJECT ID
    const projectId = WALLET_CONNECT_ID


    // MY PROJECT METADATA
    const metadata = {
        name: 'Nexus Fashion',
        description: 'My first mobile app',
        url: 'https://web3modal.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
        redirect: {
            native: 'YOUR_APP_SCHEME://',
            universal: 'YOUR_APP_UNIVERSAL_LINK.com'
        }
    }

    const wagmiConfig = defaultWagmiConfig({ chains: [sepolia, polygonMumbai], projectId, metadata })


    //HELPS ME TO CREATE A MODAL
    createWeb3Modal({
        projectId,
        chains: [sepolia, polygonMumbai], //array of chains
        wagmiConfig,
        defaultChain: sepolia,
    })


    const { isConnected, address: wcAddress } = useWalletConnectModal();

    useEffect(() => {
        if (isConnected) {
            console.log(wcAddress)
            dispatch(setAddress(wcAddress))
        }
    }, [isConnected])

    



    return (
        <SafeAreaView className={`bg-white pt-5`}>
            <Navbar />
            <SearchBar />
            {/* <Web3Modal/> */}

            <ScrollView className={`bg-[#FAF9F6]`}>
                <Categories />
                <SalesBanner />
                <FeaturedRow
                    id={1}
                    title='Offers'
                    description="Check out some of the juiciest offers"
                />
                <FeaturedRow
                    id={2}
                    title='Hot Discounts'
                    description="Some of the hottest discounts to check out"
                />
                <FeaturedRow
                    id={3}
                    title='Offers Near You!'
                    description="No need to go far! Check these out!"
                />
            </ScrollView>
            {/* <WalletConnectModal projectId={projectId} providerMetadata={metadata} /> */}
            <WalletConnectModal
                explorerRecommendedWalletIds={[
                    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
                ]}
                explorerExcludedWalletIds={'ALL'}
                projectId={projectId}
                providerMetadata={metadata}
            />
        </SafeAreaView>
    )
}

export default HomePage