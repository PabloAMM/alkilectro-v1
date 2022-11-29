import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { reauthenticate, updateEmail } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }

        
        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)        
       
        
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorPassword("Contraseña incorrecta")
            return

        }

        
        const resultUpdateEmail = await updateEmail(newEmail)
        
        setLoading(false)
        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail("No puedes cambiar este correo, esta siendo usado por otro usuario.")
            return

        }

        setReloadUser(true)
        toastRef.current.show("Correo ha sido actualizado", 3000)
        setShowModal(false)


    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)

        let isvalid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un correo valido!")
            isvalid = false
        }
        if (newEmail === email) {
            setErrorEmail("Debes ingresar un correo diferente al actual. ")
            isvalid = false
        }

        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar la contraseña. ")
            isvalid = false
        }

        return isvalid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese un nuevo correo"
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingrese la contraseña"
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}

                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar correo"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btncontainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#21745d"
    }
})