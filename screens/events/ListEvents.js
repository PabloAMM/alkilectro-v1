import { StyleSheet, Text, View } from 'react-native'
import React,{useRef,useState} from 'react'
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import AddEventForm from '../../components/events/AddEventForm'
import Loading from '../../components/loading/Loading';

export default function ListEvents({navigation}) {

    const [loading, setLoading] = useState(false);
    const toastRef = useRef()


  return (
    <View>
    <Text>ListEvents</Text>
  </View>
  )
}

const styles = StyleSheet.create({})