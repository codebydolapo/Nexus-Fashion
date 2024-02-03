//THIS IS THE ROW ON THE HOMEPAGE THAT HOLDS THE CARDA OF THE BOUTIQUES IN THEIR RESPECTIVE "FEATURED" CATEGORIES
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ArrowRightIcon, ChevronRightIcon} from 'react-native-heroicons/outline'
import BoutiqueCard from './BoutiqueCard'
import boutiques from '../data/boutiqueData'

const FeaturedRow = ({ title, description }) => {

    // Generate a random index between 0 and 11
    const randomIndex = Math.floor(Math.random() * 12);

    // Extract a subarray of five elements starting from the random index
    // Use the modulo operator to wrap around the array if needed
    const randomBoutiques = boutiques.slice(randomIndex, randomIndex + 6).map((boutique, i) => {
        return boutiques[(randomIndex + i) % 12];
    });

    return (
        <View className={`bg-white`}>
            <View className={`mt-4 flex-row items-center justify-between px-4`}>
                <Text className={`font-bold text-lg`}>{title}</Text>
                <ChevronRightIcon color="#8247e5" />
            </View>
            <Text className={`text-xs text-gray-500 px-4`}>{description}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    // paddingTop: 10
                }}
                className={`pt-4`}
            >
                {
                    randomBoutiques.map(({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat }) => {
                        return <BoutiqueCard
                            id={id}
                            imgUrl={imgUrl}
                            title={title}
                            rating={rating}
                            genre={genre}
                            address={address}
                            short_description={short_description}
                            dishes={dishes}
                            long={long}
                            lat={lat}
                            key={id}
                        />
                    })
                }
            </ScrollView>
        </View>
    )
}

export default FeaturedRow