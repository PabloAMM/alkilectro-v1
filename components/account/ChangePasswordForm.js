import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updateUserPassword } from '../../utils/actions'


export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currrentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }


        setLoading(true)
        const resultReauthenticate = await reauthenticate(currrentPassword)


        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorCurrentPassword("Incorrect password")
            return

        }


        const resultUpdatePassword = await updateUserPassword(newPassword)

        setLoading(false)
        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword("There was a problem changing the password, please try again later.")
            return

        }

        toastRef.current.show("Password have been updated", 3000)
        setShowModal(false)


    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)

        let isvalid = true

        if (isEmpty(currrentPassword)) {
            setErrorCurrentPassword("Ingrese la contraseña actual!")
            isvalid = false
        }
        if (size(newPassword) < 6) {
            setErrorNewPassword("L nueva contraseña debe ser mayor a 6 caracteres!")
            isvalid = false
        }
        if (size(confirmPassword) < 6) {
            setErrorConfirmPassword("Debes ingresar la confimacion de contraseña mayor a 6 caracteres!")
            isvalid = false
        }
        if (newPassword !== confirmPassword) {
            setErrorNewPassword("La nueva contraseña y la confirmación son diferentes.")
            setErrorConfirmPassword("La nueva contraseña y la confirmación son diferentes.")
            isvalid = false
        }
        if (newPassword === currrentPassword) {
            setErrorNewPassword("Debes ingresar una contraseña a la actual.")
            setErrorConfirmPassword("Debes ingresar una contraseña a la actual.")
            setErrorCurrentPassword("Debes ingresar una contraseña a la actual.")

            isvalid = false
        }


        return isvalid
    }
    return (
        <View style={styles.view}>

            <Input
                placeholder="Ingrese su contraseña actual"
                containerStyle={styles.input}
                defaultValue={currrentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder="Ingrese la nueva contraseña"
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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
            <Input
                placeholder="Ingrese la confirmacion de contraseña"
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title="Cambiar contraseña"
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