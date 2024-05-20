import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './sceens/AllPlaces';
import AddPlace from './sceens/AddPlace';
import React from 'react';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import Map from './sceens/Map';

const Stack = createNativeStackNavigator();
export default function App() {
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
        </Stack.Navigator>
      </NavigationContainer>

    </>);
}