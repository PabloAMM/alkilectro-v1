import React from 'react'
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import LoginForm from '../../components/account/LoginForm'



export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/alkilectroLogo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <LoginForm />
            </View>

            <Divider style={styles.divider} />
        </KeyboardAwareScrollView>
    )

}




const styles = StyleSheet.create({
    image: {
        height: 200,
        width: "100%",
        marginBottom: 20
    },

    divider: {
        backgroundColor: "#21745d",
        margin: 48
    },
    container: {
        marginHorizontal: 40
    }



})