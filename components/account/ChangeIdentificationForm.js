import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty } from "lodash";

import { UpdateDocumentWithId } from "../../utils/actions";


export default function ChangeIdentificationForm({
  id,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newId, setNewId] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await UpdateDocumentWithId("users",id,{ id: newId });
    console.log("result",result)
    setLoading(false);
    if (!result.statusResponse) {
      setError("Error al actualizar la identificación");
      return;
    }
    setReloadUser(true);
    toastRef.current.show("La identificación ha sido actualizada", 3000);
    setShowModal(false);
  };

  const validateForm = () => {
    setError(null);
    if (isEmpty(newId)) {
      setError("Debes ingresar una identificación");
      return false;
    }
    if (newId === id) {
      setError("Debes ingresar una identificación diferente al actual.");
      return false;
    }
    return true;
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Ingrese la nueva identificación"
        containerStyle={styles.input}
        defaultValue={""}
        onChange={(e) => setNewId(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={{
          type: "material-community",
          name: "card-account-details-outline",
          color: "#c2c2c2",
        }}
      />
      <Button
        title="Cambio de identificación"
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
