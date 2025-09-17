import React, { useMemo, useState } from 'react';
import { View, FlatList, Text, TextInput, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import useLocation from '../hooks/useLocation';
import usePlaces, { SORTS } from '../hooks/usePlaces';
import CafeCard from '../components/CafeCard';
import SortPills from '../components/SortPills';

export default function HomeScreen({ navigation }) {
    const { coords, permissionStatus, error: locError } = useLocation();
    const [query, setQuery] = useState('');
    const [sortKey, setSortKey] = useState(SORTS.RATING_DESC.key);
    const { cafes, loading, error } = usePlaces(coords, query);
    
    const filtered = useMemo(
        () => cafes.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
        [cafes, query]
    );

    const sorted = useMemo(() => {
        const arr = [...filtered];
        switch (sortKey) {
            case SORTS.DIST_DESC.key:
                return arr.sort((a, b) => a.distance - b.distance);
            case SORTS.REVIEWS_DESC.key:
                return arr.sort((a, b) => (b.userRatingTotal || 0) - (a.userRatingTotal || 0));
            default:
                return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
    }, [filtered, sortKey]);

    return (
        <View style={tw`flex-1 bg-zinc-50`}>
            <View style={tw`px-4 pt-4 pb-2`}>
                <Text style={tw`text-2xl font-bold`}>Find a great coffee near you ☕</Text>
                <TextInput
                    placeholder='Filter by name'
                    value={query}
                    onChangeText={setQuery}
                    style={tw`mt-3 bg-white border border-zinc-200 rounded-xl px-3 py-2`}
                />
                <SortPills sortKey={sortKey} onChange={setSortKey} />
            </View>

            {(loading || !coords) && (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size='large' />
                    <Text style={tw`mt-3 text-zinc-600`}>Looking for cafés...</Text>
                </View>
            )}

            {!loading && (error || locError) && (
                <View style={tw`px-4`}>
                    <Text style={tw`text-red-600`}>{error || locError}</Text>
                    {permissionStatus !== 'granted' && (
                        <Text style={tw`mt-2 text-zinc-600`}>Tip: Enable location in Settings</Text>
                    )}
                </View>
            )}

            {!loading && !error && coords && (
                <FlatList
                    data={sorted}
                    keyExtractor={(item) => item.placeId}
                    contentContainerStyle={tw`px-4 pb-6`}
                    renderItem={({ item }) => (
                        <CafeCard cafe={item} onPress={() => navigation.navigate('Details', { cafe: item })} />
                    )}
                />
            )}
        </View>
    );
}