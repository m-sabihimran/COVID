
import React from 'react';


import WorldStatisticsScreen from "./WorldStatisticsScreen"
import ListofCountries from "./listofcountries"
import FavouriteCountries from "./FavouriteCountries"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation  from 'react-native-vector-icons/Foundation';




const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
      drawerType="slide"
      drawerStyle={{
        backgroundColor:"black",
        
      }}
      drawerContentOptions={{
        activeTintColor: 'midnightblue',
        inactiveTintColor:"olive"
      }}
    
      
      >
        <Drawer.Screen 
        options={{
          drawerIcon:()=><Fontisto name="world-o" size={25} color="cadetblue"></Fontisto>
        }}
        name="World Statistics" component={WorldStatisticsScreen} />
        <Drawer.Screen name="countriesList" component={ListofCountries} options={{
          drawerIcon:()=><Foundation name="flag" size={25} color="white"></Foundation>,
          drawerLabel:"Countries List"}}/>
        <Drawer.Screen name="Favourites" component={FavouriteCountries} options={{
          drawerIcon:()=><Fontisto name="favorite" size={25} color="red"></Fontisto>,
          drawerLabel:"Favourite Countries"}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}