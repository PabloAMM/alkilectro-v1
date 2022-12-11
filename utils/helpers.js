
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { Alert, Linking } from 'react-native'



export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}


export const loadImageFromGallery = async (array) => {
    const response = { status: false, image: null }
   const responsePermission = ImagePicker.requestMediaLibraryPermissionsAsync()   
   
    if (responsePermission.granted === false) {
        Alert.alert("Debes de darle permiso para accerder a las imágenes del teléfono.")
        return response
    } 
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: array,
        quality: 1,

    })
    if (result.canceled) {
        return response
    }
    response.status = true
    response.image = result.assets[0].uri
    
    return response
}

export const fileTobBlob = async (path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}

export const getCurrentLocation = async () => {
    const response = {
        status: false,
        location: null
    }

    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {        
        Alert.alert("You must give permissions for the location")
        return response
    }
    const position = await Location.getCurrentPositionAsync({})
    const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
        
    }

    response.status = true
    response.location = location
    return response
}

export const formatPhone = (callingCode, phone) => {
    return `+(${callingCode}) ${phone.substr(0, 3)} ${phone.substr(3, 3)} ${phone.substr(6, 4)}`
}