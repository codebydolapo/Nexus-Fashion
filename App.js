import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import BoutiqueScreen from './screens/BoutiqueScreen';
import BasketScreen from './screens/BasketScreen';
import { store } from './store'
import { Provider } from 'react-redux'
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  useWeb3Modal
} from '@web3modal/wagmi-react-native';
import { WagmiConfig, sepolia } from 'wagmi';
import { mainnet, polygon, arbitrum, polygonMumbai } from 'wagmi/chains';
// import HomePage from './src/pages/HomePage';
import { WALLET_CONNECT_ID } from '@env'
import { useEffect } from 'react';
import { setAddress } from './features/addressSlice';
import { useDispatch } from 'react-redux';
import ConnectWalletScreen from './screens/ConnectWalletScreen';

const Stack = createNativeStackNavigator()

export default function App() {


  // 1. Get projectId at https://cloud.walletconnect.com
  const projectId = WALLET_CONNECT_ID


  // 2. Create config
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

  const chains = [polygonMumbai, sepolia];

  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })



//   //HELPS ME TO CREATE A MODAL
//   createWeb3Modal({
//     projectId,
//     chains: [polygonMumbai], //array of chains
//     wagmiConfig,
//     defaultChain: polygonMumbai,
//     excludeWalletIds: [
//         "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"//metamask
//     ]
// })

  


  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig} >

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Boutiques" component={BoutiqueScreen} />
            <Stack.Screen name="Basket" component={BasketScreen}
              options={{
                presentation: "modal",
                headerShown: false
              }}
            />
            <Stack.Screen name="ConnectWallet" component={ConnectWalletScreen}
              options={{
                presentation: "modal",
                headerShown: false
              }}
            />
            <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen}
              options={{
                presentation: "fullScreenModal",
                headerShown: false,
              }}
            />
            <Stack.Screen name="Delivery" component={DeliveryScreen}
              options={{
                presentation: "fullScreenModal",
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </WagmiConfig>
    </Provider>
  )

}
