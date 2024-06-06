import { useEffect } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";


function AllPlaces({ route }) {
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    useEffect(() => {
        if (isFocused && route.params?.place) {
            console.log(route.params.place);
            setLoadedPlaces((currentPlaces) => [...currentPlaces, route.params.place]);
        }
    }, [isFocused]);
    return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;