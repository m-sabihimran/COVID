import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ActivityIndicator
  } from 'react-native';
import { color, set } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Moment from 'moment';
 
const HomeScreen=()=>{  

// var resp = ""
const [resp , setresp ]= useState([])
const [Load, setload] = useState(true)
const [worldPopulation, setWorldPopulation] = useState(0)
const [WorldPopLoad, setWorldload] = useState(true)

const getCovidData=()=>{
  
  fetch("https://covid-19-data.p.rapidapi.com/totals", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
    
  })
  .then((response)=>response.json())
  .then(responseJson => {
      // console.log(response);
      setload(false)
      setresp(responseJson[0])
  })
  .catch(err => {
    console.error(err);
  });

}
const getWorldPopulation=()=>{
  
  fetch("https://world-population.p.rapidapi.com/worldpopulation", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
		"x-rapidapi-host": "world-population.p.rapidapi.com"
	}
})
.then((response) => response.json())
.then(resJson=>{
  setWorldload(false)
  setWorldPopulation((resJson.body.world_population))

})
.catch(err => {
	console.error(err);
});

}


useEffect(()=>{

  getCovidData()
  getWorldPopulation()
 

},[])



if (Load || WorldPopLoad ) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator size="large" color="red" />
      <Text style={{textAlign:"center", marginTop:"5%"}}>Loading Data from Fetch API ...</Text>
    </View>
    );
  }

return( 
    <View style={styles.container}>
      <View style={{alignItems:"center"}}>
        <Text style={styles.headers}>Population</Text ><Text style={styles.headerTwo}>{worldPopulation}</Text>
      </View>
      <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Cases Confirmed</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo}> {JSON.stringify(resp.confirmed)}</Text><Text style={styles.content}>{'      '}{((resp.confirmed/worldPopulation)*100).toFixed(2)}% of the world</Text></View>
      </View>
      <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Cases Recovered</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo} > {JSON.stringify(resp.recovered)}</Text><Text style={styles.content}>{'     '}{((resp.recovered/resp.confirmed)*100).toFixed(2)} % of the the confirmed cases</Text></View>
        </View>
      <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Critical Cases</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo} >{JSON.stringify(resp.critical)}</Text><Text style={styles.content}>{'     '}{((resp.critical/worldPopulation)*100).toFixed(9)} % of the world </Text></View>
      </View>
      
        
    
        
        <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Deaths</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo} >{JSON.stringify(resp.deaths)}</Text><Text style={styles.content}>{'    '}{((resp.deaths/worldPopulation)*100).toFixed(2)} % of the world </Text></View>
      </View>
        <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Last Update</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo}> {Moment(resp.lastUpdate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text></View>
        </View>
        
    </View>
)


}


const Stack = createStackNavigator();
function App() {


  return (

      <Stack.Navigator screenOptions={({navigation})=>({

        headerTitleAlign:"center",
  
        headerLeft:()=> ( <TouchableOpacity onPress={()=>navigation.openDrawer()}><Text><Entypo name="menu" size={30} color="#900"></Entypo></Text></TouchableOpacity>),
        headerRight:()=><Fontisto style={{marginRight:3}}  name="world-o" size={25} color="wheat"></Fontisto>,
        headerTintColor:"wheat",
        headerStyle:{
          backgroundColor:"blue"
        }

      })}>
        <Stack.Screen name="COVID Stats" component={HomeScreen}
        />
       
      </Stack.Navigator>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    
    justifyContent:"center",
    backgroundColor:"orange"
  },
  headers:{
    marginTop:10,
    fontSize:28,
    color:"darkslategrey",
    fontFamily:"sans-serif-light",
    borderBottomWidth:2,
    borderBottomColor:"crimson",
    fontWeight:"bold"
  },
  headerTwo:{
    marginTop:12,
    fontSize:15,
    fontFamily:"serif",
    color:"darkred"
  },
  content:{
    marginTop:12,
    fontFamily:"sans-serif-condensed",
    color:"green"
  },
  
});


export default App