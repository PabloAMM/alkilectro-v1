import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from "react-native-easy-toast"

import Loading from '../../components/loading/Loading'
import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'
import { closeSession, getCurrentUser } from '../../utils/actions'



export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)



    useEffect(() => {
        setUser(getCurrentUser())       
        setReloadUser(false)
    }, [reloadUser])


    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <InfoUser
                            user={user}
                            setLoadingText={setLoadingText}
                            setLoading={setLoading}
                        />
                        <AccountOptions
                            user={user}
                            toastRef={toastRef}
                            setReloadUser={setReloadUser}
                        />
                    </View>
                )
            }


            <Button
                title="Cerrar Sesion"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("events")
                }}

            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#7fa996",
        borderBottomWidth: 1,
        borderBottomColor: "#7fa996",
        paddingVertical: 10
    },

    btnCloseSessionTitle: {
        color: "#171918"
    }



})