import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Button,
    ActivityIndicator,
    Alert
  } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Fontisto from 'react-native-vector-icons/Fontisto';


  const FavList=({navigation})=>{  
   
    const[favnames, setfavNames] = useState([])
    const [color, setcolor] = useState("#900")
    
    const getFav = async()=>{ //will first get names from asyncStorage i.e favourite countries names.   

        const Cname =  await AsyncStorage.getAllKeys()
        
     
        setfavNames(Cname)
        
    }

    const clearFav= async(item)=>{// this will remove country from async storage when the star will be pressed.
 
      Alert.alert(
        "Country Removed...!",
        "Country has been removed from the favourites",
        [
          { text: "OK", onPress: () => {} }
        ],
      );
      
      await AsyncStorage.removeItem(item)

    
    }

    useEffect(()=>{
        
        getFav()

    })
   
   
    return(
        <View style={styles.container}>
          <View style={{marginTop:10}}></View>
          
            <FlatList

                keyExtractor={(item,ind)=>"Key" + ind }
                data={favnames}

                renderItem={({item})=> (
          
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        
                    <View style={{width:350, flex:1}} >
                        <TouchableOpacity onPress={() => navigation.navigate("Details", {county: item })}>
                        <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                                            
                    </View>
                    <View style={{alignItems:"flex-end"}}>
                            <TouchableOpacity onPress={()=>{clearFav(item)}}>
                            <Text style={styles.itemTwo}><Ionicons name="star-sharp" size={29} color={color}/>  {/*#900*/}</Text>
                            </TouchableOpacity>
                    </View>
        

                    </View>
                )}
        >

            </FlatList>

        </View>
    )

  }

  const FavDetail=({route})=>{

    const country = route.params.county
    const [details, setDetails] = useState([])
    const [Loading, setloading] = useState(true)
    const [color, setcolor] = useState("grey")


    const getFav = async()=>{

        const Cname =  await AsyncStorage.getItem(country)
        
        if(Cname){
          setcolor("#900")
        }
        
        }


    useEffect(()=>{
  
        getFav()
      
        fetch('https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name='+country, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
          }
        })
        .then((response)=>response.json())
        .then(response => {
          setDetails(response)
          setloading(false)
         
        })
        .catch(err => {
          console.error(err);
      
      
      
        });
      }, [])
      
      if (Loading) {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator size="large" color="blue" />
            <Text>Loading Data from JSON Placeholder API ...</Text>
          </View>
        );
      }
      
   
      
      
      
        return(
          <View>
            <View style={{alignItems:"flex-end",marginTop:7}}>
            
              <Text>
              <Ionicons name="star-sharp" size={30} color={color}/> 
              </Text>

            </View>
            <View style={{alignItems:"flex-start", marginBottom:15}}>
       
       <View style={{flexDirection:"row"}}><Text style={styles.textt}>longitude :{'  '} </Text><Text style={styles.textTwo}>{JSON.stringify(details[0].longitude)}</Text></View>
       <View  style={{flexDirection:"row"}}><Text style={styles.textt}>latitude :{'  '} </Text><Text  style={styles.textTwo}>{JSON.stringify(details[0].latitude)}</Text></View>
       <View  style={{flexDirection:"row"}}><Text style={styles.textt}>Country :{'  '} </Text><Text  style={styles.textTwo}>{JSON.stringify(details[0].country).slice(1, -1)}</Text></View>
       <View  style={{flexDirection:"row"}}><Text style={styles.textt}>Date :{'  '} </Text><Text  style={styles.textTwo}>{JSON.stringify(details[0].date).slice(1, -1)}</Text></View>
       
       </View>
            
            
            <FlatList
              keyExtractor={(item,ind)=>"Key" + ind }
              data={details[0].provinces}
              renderItem={({item})=> (
                <View style={{flexDirection:"row"}}>
                
                <Text style={styles.item} >Province: {(item.province)}{'   '} Confirmed: {item.confirmed}{'\n\n'} Recovered: {item.recovered}{'   '}
                 Deaths: {item.deaths}{'   '} Active: {item.active}
                </Text>
      
                </View>
              )}
              >
      
              </FlatList>
          
        
          </View>
      
        )
      
      }

 const Stack = createStackNavigator();
  function App() {


    return (
    
        <Stack.Navigator screenOptions={({navigation})=>({

          headerRight:()=><Fontisto style={{marginRight:3}} name="favorite" size={25} color="wheat"></Fontisto>,

          headerTitleAlign:"center",
    
          headerTintColor:"wheat",
          headerStyle:{
            backgroundColor:"orangered"
          }
  
        })}>
          <Stack.Screen name="Favourites" component={FavList}/>
          <Stack.Screen name="Details" component={FavDetail}  
           options={{
            headerRight:()=><Ionicons style={{marginRight:3}}  name="stats-chart" size={25} color="wheat"></Ionicons>,

          }}
          />
        </Stack.Navigator>
     
    );
  }



  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"gainsboro"
    },
    item: {
      backgroundColor: 'seashell',
      fontWeight:"bold",
      color:"saddlebrown",
      padding: 20,
      borderWidth:1,
      borderColor:"grey",
      fontFamily:"sans-serif-light",
      marginLeft:10,
      width:370,
 
    
    },
    itemTwo:{
      backgroundColor: 'seashell',
      fontWeight:"bold",
      color:"saddlebrown",
      padding: 14,
      borderWidth:1,
      borderColor:"grey",
      fontFamily:"sans-serif-light",
    
    },
    textt:{
     
      fontFamily:"sans-serif-light",
      fontSize:23,
      color:"midnightblue",
      marginLeft:10,  
      fontWeight:"bold"
      
    },
    textTwo:{
      fontFamily:"sans-serif-light",
      fontSize:18,
      color:"maroon",
      marginTop:5,
      justifyContent:"center"
    }
   
  });


  export default App