const GOOGLE_API = process.env.EXPO_PUBLIC_GOOGLE_MAPS_STATIC_API
export function getMapPreview(lat, lng) {
    if(!GOOGLE_API){
        throw new Error('No Google API key found! Please check your environment variables.');
    }
    
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API}`
    return imagePreviewUrl;
}