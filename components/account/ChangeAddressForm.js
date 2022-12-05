import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty } from "lodash";

import { UpdateDocumentWithId } from "../../utils/actions";


export default function ChangeAddressForm({
  id,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newAddress, setNewAddress] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await UpdateDocumentWithId("users",id,{ address: newAddress });
    console.log("result",result)
    setLoading(false);
    if (!result.statusResponse) {
      setError("Error al actualizar la dirección");
      return;
    }
    setReloadUser(true);
    toastRef.current.show("La dirección ha sido actualizada", 3000);
    setShowModal(false);
  };

  const validateForm = () => {
    setError(null);
    if (isEmpty(newAddress)) {
      setError("Debes ingresar una dirección");
      return false;
    }
   
    return true;
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Ingrese la nueva dirección"
        containerStyle={styles.input}
        defaultValue={""}
        onChange={(e) => setNewAddress(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={{
          type: "material-community",
          name: "map-marker-outline",
          color: "#c2c2c2",
        }}
      />
      <Button
        title="Cambio de dirección"
        containerStyle={styles.btncontainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  btncontainer: {
    width: "95%",
  },
  btn: {
    backgroundColor: "#21745d",
  },
});
