import ABI from "../../smart_contracts/artifacts/contracts/Nexus.sol/Nexus.json";
import { nexusAddress } from "../../smart_contracts/src/nexusAddress";
import { useSelector } from 'react-redux';
import { selectAddress } from '../../features/addressSlice';
import { selectBasketTotal } from '../../features/basketSlice'
import { Alert } from 'react-native';
import { polygonMumbai, sepolia } from 'wagmi/chains';
import {
    useNetwork,
    usePrepareSendTransaction,
    useSendTransaction,
    useSignMessage,
    useWaitForTransaction,
    useSwitchNetwork
} from 'wagmi';
import { parseEther } from 'viem';



function useBuyItems() {

    const { chains, error, pendingChainId, switchNetwork, status } =
    useSwitchNetwork()

    const address = useSelector(selectAddress)

    const total = useSelector(selectBasketTotal)

    const { chain } = useNetwork();

    // Ask the wallet to sign a message
    const { data: signedHash, signMessage } = useSignMessage({
        message: 'Sign this message to prove you are the owner of this wallet',
        chainId: sepolia.id
    });

    // Ask the wallet to send test MATIC on Polygon Mumbai testnet
    const { config } = usePrepareSendTransaction({
        chainId: sepolia.id,
        // Replace `to` with another address to receive the tokens
        to: nexusAddress,
        value: parseEther(total.toString()),
    });
    const { data: txData, sendTransaction } = useSendTransaction(config);

    // Watch for transaction completion and show a success alert when done
    useWaitForTransaction({
        chainId: sepolia.id,
        hash: txData?.hash,
        onSuccess() {
            Alert.alert('Transaction succeeded!', `${total} MATIC sent successfully`);
        },
    });

    async function payFunc() {
        signMessage?.()
        sendTransaction?.()
        switchNetwork?.(sepolia.id)
    }

    return {
        payFunc
    }
}

export default useBuyItems;
