import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateUserProfile } from '../../utils/actions'


export default function ChangeDisplayNameForm({ displayName, setShowModal, toastRef, setReloadUser }) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        const result = await updateUserProfile({ displayName: newDisplayName })
        setLoading(false)
        if (!result.statusResponse) {
            setError("Error al actualizar el nombre y apellido")
            return

        }
        setReloadUser(true)
        toastRef.current.show("El nombre y apellido ha sido actualizado", 3000)
        setShowModal(false)


    }

    const validateForm = () => {
        setError(null)
        if (isEmpty(newDisplayName)) {
            setError("Debes ingresar un nombre y apellido")
            return false
        }
        if (newDisplayName === displayName) {
            setError("Debes ingresar un nombre y apellido diferente al actual.")
            return false
        }
        return true
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese su nombre y apellido"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            />

            <Button
                title="Cambiar nombre y apellido"
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