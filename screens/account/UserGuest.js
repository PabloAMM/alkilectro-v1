import React from 'react'
import { StyleSheet, Text, Image , ScrollView } from 'react-native'
import {Button,Divider} from 'react-native-elements'
import {useNavigation}  from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
        centerContent
        style={styles.viewBody}
        >
  
            <Image
              source = {require ("../../assets/alkilectroLogo_3.png")}
              resizeMode="contain"
              style={styles.image}    
             />
             <Text  style={styles.greetings}> Bienvenido Usuario </Text>

             <Text style={styles.description}>
               
                Esta es la aplicación de reserva de equipos audiovisuales
                que tu evento necesita.
                {"\n"}
                {"\n"}
                Ingresa y conoce todas las opciones que tenems para ti.
                                
             </Text>
             <Divider style={styles.divider} />  
             <Button
                buttonStyle={styles.btnLogin}
                title="Login"
                onPress={() => navigation.navigate("login")}
                
             />

             <Text style={styles.descriptionRegister} onPress={() => navigation.navigate("register")} > Si aun no tienes cuenta
             <Text  style={styles.register}> Registrate</Text>
             </Text>
             
        </ScrollView>
      )
}

const styles = StyleSheet.create({

    viewBody: {
        marginHorizontal: 20
     

    },

    image:{
        height:300,
        width:"100%",
        marginBottom:20,
        backgroundColor:"#FFFFFF",
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,  

    },

    title:{
        fontWeight:"bold",
        fontSize:19,
        marginVertical:10,
        textAlign:"center"
    },
    greetings:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize:19,
        marginBottom: 20,
        color:"#193653"
    },

    description:{
        textAlign: 'center',
        marginBottom: 30,
        fontSize:15,
        color:"black",
        fontWeight: "bold",
    },

    btnLogin:{
        backgroundColor:"#6c9885"
    },

    register:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize:16,
        marginBottom: 20,
        marginTop:5,
        color:"#80c9c3"
    },
    descriptionRegister:{
        textAlign: 'justify',
        marginBottom: 50,
        fontSize:15,
        color:"black",
        fontWeight: "bold",
        marginTop:5
    },
    divider: {
        backgroundColor: "#21745d",
        margin: 20
    }
})