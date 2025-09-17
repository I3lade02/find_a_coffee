import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function DetailsScreen({ route }) {
    const { cafe } = route.params;
    return (
        <View stlye={tw`flex-1 p-4 bg-white`}>
            <Text style={tw`text-2xl font-bold`}>{cafe.name}</Text>
            <Text style={tw`mt-2 text-zinc-600`}>{cafe.vincinity || '--'}</Text>
            <Text style={tw`mt-2`}>Rating: {cafe.rating ?? '--'} ({cafe.userRatingTotal ||0} reviews)</Text>
            <Text style={tw`mt-2`}>Distance: {cafe.distance?.toFixed(1)} km</Text>
        </View>
    );
}