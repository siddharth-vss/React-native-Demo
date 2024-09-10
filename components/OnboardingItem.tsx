import { StyleSheet, Text, View,Image,useWindowDimensions } from 'react-native'
import React from 'react'

export interface List {
    id: string,
    title: string,
    discription: string,
    image: any,
}
const OnboardingItem = ({item}: {item:List}) => {
  const {width} = useWindowDimensions();
  // console.log(item.image)
  return (
    <View style={[styles.container,{width}]}>
      <Image source={item.image} style={[styles.image,{width: width, resizeMode:'center'}]} />
      <View>
        <Text style={[styles.title]} >{item.title}</Text>
        <Text style={[styles.description]} >{item.discription}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  image:{
    flex:0.7,
    justifyContent:"center",
  },
  title:{
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 10,
    textAlign:'center',
    color: '#6C63FF',
  },
  description:{
    paddingHorizontal:64,
    fontWeight: 300,
    marginBottom: 10,
    textAlign:'center',
    color: '#62656b',
  },

})