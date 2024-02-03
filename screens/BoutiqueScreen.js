import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MapIcon, ChevronRightIcon, ArrowLeftIcon, StarIcon, ChevronLeftIcon, } from 'react-native-heroicons/solid'
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import whatsapp from '../assets/icons/whatsapp.png'
import OfferingRow from '../components/OfferingRow';
import offeringData from "../data/offeringData"
import BasketTotal from '../components/BasketTotal';
import highlightsData from '../data/highlightsData';
import Highlights from '../components/Highlights';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { setBoutique } from '../features/boutiqueSlice';


const BoutiqueScreen = () => {

    //allows me to control what the nav bar looks like
    const navigation = useNavigation();

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const { params: {
        id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
    } } = useRoute()

    const [shuffledOfferingData, setShuffledOfferingData] = useState(offeringData);
    const [shuffledHighlights, setShuffledHighlights] = useState(highlightsData)

    useEffect(() => {
        function shuffleArray(array) {
            const shuffled = array.slice(); // Create a copy of the array
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
            }
            return shuffled;
        }
        setShuffledOfferingData(shuffleArray(offeringData));
        setShuffledHighlights(shuffleArray(highlightsData))
    }, []);

    useEffect(() => {
        dispatch(setBoutique(
            { id, imgUrl, title, rating, genre, address, short_description, dishes }
        ))
    }, [])

    const total = useSelector(selectBasketTotal)

    return (
        <>
            {total !== 0 && <BasketTotal />}
            <ScrollView className={``}>
                <View className={`relative h-100`}>
                    {/* <View className={`absolute top-0 w-full h-16 bg-gray-700 border-2 border-white`}></View> */}
                    <Image
                        source={{ uri: Image.resolveAssetSource(imgUrl).uri }}
                        className={`w-full h-56 bg-gray-300 p-4`}
                    />
                    <TouchableOpacity
                        className={`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}
                        onPress={navigation.goBack}
                    >
                        <ArrowLeftIcon size={20} color="#8247e5"/>
                    </TouchableOpacity>
                </View>

                <View className={``}>
                    <View className={`px-4 pt-4 bg-white`}>
                        <Text className={`text-3xl font-bold`}>{title}</Text>

                        <View className={`flex-row space-x-2 my-1`}>
                            <View className={`flex-row items-center space-x-1`}>
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text className={`text-xs text-gray-500`}>{rating} - {genre}</Text>
                            </View>
                            <View className={`flex-row items-center space-x-1`}>
                                <MapIcon color="black" opacity={0.5} size={22} />
                                <Text className={`text-xs text-gray-500`}>Nearby - {address}</Text>
                            </View>
                        </View>
                        <Text className={`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
                    </View>

                    <View className={`bg-white border-y-2 border-gray-100 flex items-center justify-center py-2`}>
                        {/* <Text className={`px-4 font-bold text-xl`}>Highlights</Text> */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}

                        >
                            {shuffledHighlights.map(({ image }) => {

                                return <Highlights
                                    image={image}
                                    key={image}
                                />
                            })
                            }
                        </ScrollView>
                    </View>


                    {/* <TouchableOpacity className={`flex-row items-center space-x-2 p-4 border-y border-gray-300 bg-white`}>
                    <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                    <Text className={`pl-2 flex-1 text-sm font-bold`}>Need to speak to the manager?</Text>
                    <Image
                        source={{ uri: Image.resolveAssetSource(whatsapp).uri }}
                        className={`h-2 bg-gray-300 p-4 rounded-full`}
                    />

                </TouchableOpacity> */}

                    <View className={`bg-white pb-36`}>
                        <Text className={`px-4 pt-6 mb-3 font-bold text-xl`}>Offerings</Text>
                        {shuffledOfferingData.map(({ id, name, description, price, image, rating }) => {
                            return <OfferingRow
                                id={id}
                                name={name}
                                description={description}
                                price={price}
                                image={image}
                                key={id}
                                rating={rating}
                            />
                        })}
                    </View>

                </View>

            </ScrollView>
        </>
    )
}

export default BoutiqueScreen