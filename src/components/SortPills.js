import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { SORTS } from '../hooks/usePlaces';

export default function SortPills({ sortKey, onChange }) {
    return (
        <View style={tw`mt-3 flex-row gap-2`}>
            {Object.values(SORTS).map((s) => (
                <TouchableOpacity
                    key={s.key}
                    onPress={() => onChange(s.key)}
                    style={tw`${sortKey === s.key ? 'bg-black' : 'bg-white'} border border-zinc-300 px-3 py-2 rounded-full`}
                >
                    <Text style={tw`${sortKey === s.key ? 'text-white' : 'text-black'} text-sm`}>{s.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}