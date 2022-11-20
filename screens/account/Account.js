import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet , Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/loading/Loading'
// import { getCurrentUser, isUserLogged } from '../../utils/actions'

export default function Account() {
    const [login , setLogin] = useState(null)

    useFocusEffect (
        useCallback(() => {
          /*   const user = getCurrentUser()
            console.log(user) */
       //     user ? setLogin(true) : setLogin(false) 
          
        }, [] )
    )   
    
    if (login == null){
        return<Loading isVisible={true} text="Cargando..."/>
    }
    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})