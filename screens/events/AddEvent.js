import { StyleSheet, Text, View } from 'react-native'
import React,{useRef,useState} from 'react'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AddEventForm from '../../components/events/AddEventForm'
import Loading from '../../components/loading/Loading'


export default function AddEvent({navigation}) {
const [loading, setLoading] = useState();
const toastRef = useRef()
  return (
    <KeyboardAwareScrollView>
      <AddEventForm 
      toastRef={toastRef} 
      setLoading={setLoading}
      navigation={navigation}
      />
      <Loading isVisible={false} text="Creando evento..."/>
      <Toast ref={toastRef} position="center" opacity={0.9}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})