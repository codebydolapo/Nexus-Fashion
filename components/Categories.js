// THIS IS THE ROW ON THE HOMEPAGE THAT HOLDS THE DIFFERENT CATEGORY CARDS

import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import categoryData from '../data/categoryData'

const Categories = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
        >
            {
                categoryData.map(({ imgUrl, title }) => {
                    return <CategoryCard
                        imgUrl={imgUrl}
                        title={title}
                        key={title}
                    />
                })
            }
        </ScrollView>
    )
}

export default Categories