import { useEffect } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { fetchPlaces } from "../util/database";


function AllPlaces({ route }) {
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    useEffect(() => {

        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }

        if (isFocused) {
            loadPlaces();
        }
    }, [isFocused]);
    return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;