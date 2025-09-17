const USE_PLACES_V1 = true; // ← toggle to try the new endpoint
const SEARCH_RADIUS_METERS = 3500;
const USE_MOCK = true;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_API_KEY;


export async function fetchCafes({ lat, lng }, nameFilter = '') {
    if (USE_MOCK) return fetchMock({ lat, lng });
    return USE_PLACES_V1
        ? fetchGoogleV1({ lat, lng })
        : fetchGoogleV1({ lat, lng }, nameFilter);
}

async function fetchGoogleV1({ lat, lng }) {
    const url = 'https://places.googleapis.com/v1/places:searchNearby';
    const body = {
        includedTypes: ['cafe'],
        maxResultCount: 20,
        locationRestriction: {
        circle: { center: { latitude: lat, longitude: lng }, radius: SEARCH_RADIUS_METERS }
    },
// rankPreference: 'DISTANCE', // optional
};

const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.location',
        'places.rating',
        'places.userRatingCount',
        'places.formattedAddress',
        'places.currentOpeningHours.openNow',
        ].join(','),
    },
    body: JSON.stringify(body),
});

const json = await res.json();
if (!res.ok || json.error) {
    const msg = json?.error?.message || `HTTP ${res.status}`;
    throw new Error(`Places v1 error: ${msg}`);
}

const places = json.places || [];
return places.map((p) => ({
    placeId: p.id,
    name: p.displayName?.text || 'Unknown',
    rating: p.rating,
    userRatingsTotal: p.userRatingCount,
    vicinity: p.formattedAddress,
    lat: p.location?.latitude,
    lng: p.location?.longitude,
    openNow: p.currentOpeningHours?.openNow,
}));
}