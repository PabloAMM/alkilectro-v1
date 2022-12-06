import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { map } from 'lodash'


import Modal from '../../utils/Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeIdentificationForm   from './ChangeIdentificationForm'   
import ChangeAddressForm from './ChangeAddressForm'
import ChangPhoneForm from './ChangPhoneForm'

export default function AccountOptions({ user, toastRef, setReloadUser }) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponet, setRenderComponet] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: "Cambiar nombre y apellidos",
                iconNameleft: "account-circle",
                iconColorLeft: "#587368",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("displayName")
            },
            {
                title: "Cambiar identificación",
                iconNameleft: "identifier",
                iconColorLeft: "#587368",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("id")
            },
            {
                title: "Cambiar dirección",
                iconNameleft: "map-marker-outline",
                iconColorLeft: "#587368",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("address")
            },
            {
                title: "Cambiar telefono",
                iconNameleft: "phone-refresh-outline",
                iconColorLeft: "#587368",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("phone")
            },
            {
                title: "Cambio de correo",
                iconNameleft: "at",
                iconColorLeft: "#587368",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("email")
            },
            {
                title: "Cambio de contraseña",
                iconNameleft: "lock-reset",
                iconColorLeft: "#587368",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("password")
            },
        ]
    }

    const selectedComponet = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponet(
                    <ChangeDisplayNameForm
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
                case "id":
                setRenderComponet(
                    <ChangeIdentificationForm
                        id={user.uid}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
                case "address":
                setRenderComponet(
                    <ChangeAddressForm
                        id={user.uid}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
                case "phone":
                setRenderComponet(
                    <ChangPhoneForm
                        id={user.uid}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponet(
                    <ChangeEmailForm
                        email={user.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderComponet(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )

                break;
        }
        setShowModal(true)
    }
    const menuOptions = generateOptions();
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameleft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponet
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({})