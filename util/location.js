const GOOGLE_API = process.env.EXPO_PUBLIC_GOOGLE_MAPS_STATIC_API
export function getMapPreview(lat, lng) {
    if (!GOOGLE_API) {
        throw new Error('No Google API key found! Please check your environment variables.');
    }

    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API}`
    return imagePreviewUrl;
}

export async function getAdress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch address. Please try again!');
    }

    const data = await response.json();
    if (!data.results) {
        throw new Error('Failed to fetch address. Please try again!');
    }
    const address = data.results[0].formatted_address;
    return address;
}