import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
    const [coords, setCoords] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState('undertermined');
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Location permission denied');
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
                setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
            } catch (e) {
                setError('Could not get your location');
            }
        })();
    }, []);
    return { coords, permissionStatus, error };
}