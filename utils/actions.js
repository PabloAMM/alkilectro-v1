import { auth, database } from './firebase'
import { collection, addDoc } from 'firebase/firestore';
import 'firebase/firestore'

import { signInWithEmailAndPassword,currentUser,onAuthStateChanged } from "firebase/auth";

//const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => 
{
    let isLogged = false
 
    onAuthStateChanged(auth,(user) => {
        user !== null && (isLogged = true) 
    })

    return isLogged

}

export const getCurrentUser = ()  => {
  
    return auth.currentUser
}

/* export const registerUser  = async (email, password) => {
    const result= {statusResponse: true, error:null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        
    } catch (error) {
        result.statusResponse = false
        result.error="Este correo ya ha sido registrado"
        
    }
    return result
}

export const closeSession = ()  => {
    return firebase.auth().signOut()
}

export const updateProfile = async(data) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updateProfile(data)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}


export const loginWithEmailAndPassword = async (email, password) => {
    const result = {
        statusResponse: true,
        error: null
    }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)

    } catch (error) {
        result.error = "Usuario o contraseña no valida!"
        result.statusResponse = false
    }

    return result

}

export const reauthenticate = async (password) => {
    const result = {
        statusResponse: true,
        error: null,

    }

    const user = getCurrentUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updateEmail = async (email) => {
    const result = {
        statusResponse: true,
        error: null,

    }

    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updatePassword = async (password) => {
    const result = {
        statusResponse: true,
        error: null,

    }

    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
} */