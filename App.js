import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './sceens/AllPlaces';
import AddPlace from './sceens/AddPlace';
import React, { useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import Map from './sceens/Map';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './sceens/PlaceDetails';

const Stack = createNativeStackNavigator();
export default function App() {

  const [dbInitialized, setDbInitialized] = useState();

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((error) => console.log(error));
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500
          },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
          ,
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={
            ({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: (tintColor) => (
                <IconButton iconName="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
              )
            })
          } />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add a New Place'

          }} />
          <Stack.Screen name="Map" component={Map} options={{
            title: 'Map'
          }} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'Details'
          }} />
        </Stack.Navigator>
      </NavigationContainer>

    </>);
}