import React , {useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Button,Input ,Icon} from 'react-native-elements'

import { validateEmail } from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'
import Loading from '../loading/Loading'

export default function LoginForm() {

    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)


     const navigation = useNavigation()

      const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
      }


      const doLogin = async() => {
        if(!validateData()){
            return;
          }

          setLoading(true)
          const result = await loginWithEmailAndPassword(formData.email,formData.password)
          setLoading(false)
      
      
          if(!result.statusResponse)
          {
              setErrorEmail(result.error)
              setErrorPassword(result.error)
              return
      
          }
      
          navigation.navigate("information")
        }
    
        const validateData = () => {
            setErrorEmail("")
            setErrorPassword("")
            let isValid = true 
        
            if(!validateEmail(formData.email)) {
                setErrorEmail("Debes de ingresar un email valido")
                isValid = false 
            }
        
            if(isEmpty(formData.password)) {
                setErrorPassword("Debes de ingresar tu contraseña")
                isValid = false 
            }
        
            return isValid
        
        }
    

    return (
     <View style={styles.container}>

        <Input
          containerStyle={styles.input}
             placeholder="Ingrese tu email"
             onChange={(e)=> onChange(e, "email")}
             keyboardType="email-address"
             errorMessage={errorEmail}
             defaultValue={formData.email}
          />
  
          <Input
          containerStyle={styles.input}
             placeholder="Ingrese tu contraseña"
             password={true}
             secureTextEntry={!showPassword}
             onChange={(e)=> onChange(e, "password")}
             errorMessage={errorPassword}
             defaultValue={formData.passwordl}
             rightIcon={
                 <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline": "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={()=> setshowPassword(!showPassword)}              
                 />
              }  
          />

            <Button
                title="Iniciar Sesion "
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
           />


          <Loading isVisible={loading} text="Iniciando Sesión ..."/>

     </View>
    )
}

const defaultFormValues = () => {
    return {email: "", password: ""}
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30
    },
    input: {
        width: "100%"
    },
    btnContainer:{
        marginTop: 20,
        width:"95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor:"#41ac88"

    },
    icon:{
        color:"#74445a"

    }


})