import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import tw from 'twrnc';


export default function CafeCard({ cafe, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={tw`bg-white rounded-2xl p-4 mb-3 border border-zinc-100 shadow-sm`}>
            <View style={tw`flex-row justify-between items-start`}>
                <View style={tw`flex-1 pr-3`}>
                    <Text style={tw`text-lg font-semibold`}>{cafe.name}</Text>
                    {!!cafe.vicinity && <Text style={tw`text-zinc-600 mt-0.5`} numberOfLines={1}>{cafe.vicinity}</Text>}
                    <Text style={tw`text-zinc-600 mt-1`}>{cafe.distance?.toFixed(1)} km away</Text>
                </View>
                <View style={tw`items-end`}>
                    <Text style={tw`text-base font-semibold`}>★ {cafe.rating?.toFixed(1) ?? '—'}</Text>
                    {!!cafe.userRatingsTotal && <Text style={tw`text-xs text-zinc-500`}>{cafe.userRatingsTotal} reviews</Text>}
                    {cafe.openNow !== undefined && (
                        <Text style={tw`text-xs mt-1 ${cafe.openNow ? 'text-emerald-600' : 'text-red-500'}`}>
                            {cafe.openNow ? 'Open now' : 'Closed'}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}