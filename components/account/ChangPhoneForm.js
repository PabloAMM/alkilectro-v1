import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty, size } from "lodash";
import { UpdateDocumentWithId } from "../../utils/actions";

export default function ChangPhoneForm({
  id,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newPhone, setNewPhone] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await UpdateDocumentWithId("users", id, { phone: newPhone });

    setLoading(false);
    if (!result.statusResponse) {
      setError("Error al actualizar el telefono");
      return;
    }


    setReloadUser(true);
    toastRef.current.show("El telefono ha sido actualizada", 3000);
    setShowModal(false);
  };

  const validateForm = () => {
    setError(null);
    if (isEmpty(newPhone)) {
      setError("Debes ingresar un telefono");
      return false;
    }
    if (size(newPhone) < 7 || size(newPhone) > 10) {
      setError("Debes ingresar un telefono valido");
      return false;
    }
    return true;
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Ingrese el nuevo telefono"
        containerStyle={styles.input}
        keyboardType="phone-pad"
        defaultValue={""}
        onChange={(e) => setNewPhone(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={{
          type: "material-community",
          name: "phone-refresh-outline",
          color: "#c2c2c2",
        }}
      />
      <Button
        title="Cambio de # telefono"
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
