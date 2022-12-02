import React, { useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'


import { uploadImage, updateUserProfile } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helpers'


export default function InfoUser({ user, setLoadingText, setLoading }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)  
   
    const changePhoto = async () => {
        const result = await loadImageFromGallery([1, 1])

        if (!result.status) {
            return
        }
        setLoadingText("Actualizando foto de perfil..")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)              
        if (!resultUploadImage.statusResponse) {
            
            setLoading(false)
            Alert.alert("Hubo un error guardando la foto de perfil")
            return
        }
        console.log("StatusResponse",resultUploadImage)  
        const resultUpdateProfile = await updateUserProfile({ photoURL: resultUploadImage.url })
        setLoading(false)
        if (resultUpdateProfile.statusResponse) {
            setPhotoUrl(resultUploadImage.url)

        } else {
            Alert.alert("Hubo un error miestras se actualizaba el perfil.")
        }
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress={changePhoto}
                source={
                    photoUrl ? { uri: photoUrl }
                        : require("../../assets/avatar-default.jpg")
                }
            />

            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anónimo"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }

})