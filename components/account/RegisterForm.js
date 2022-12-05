import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";
//import MapView from 'react-native-maps'

import { validateEmail, getCurrentLocation } from "../../utils/helpers";
import {
  registerUser,
  AddDocumentWithId,
  updateUserProfile,
} from "../../utils/actions";
import Loading from "../loading/Loading";
// import MapUser from './MapUser'
//import Modal from '../../utils/Modal'

export default function RegisterForm() {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorFullname, setErrorFullname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorAdress, setErrorAddress] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorId, setErrorId] = useState("");
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }
    setLoading(true);

    const result = await registerUser(formData.email, formData.password);
    console.log("Result", result);
    if (!result.statusResponse) {
      setLoading(false);
      setErrorEmail(result.error);
      return;
    }

    formData.uid = result.uid;

    const responseAddDocument = await AddDocumentWithId(
      "users",
      formData.uid,
      formData
    );
    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "No fue posible realizar la creación del usuario, por favor intentelo más tarde.",
        3000
      );
      return;
    }

    const responseUpdateProfile = await updateUserProfile({
      displayName: formData.fullname,
    });
    setLoading(false);
    if (!responseUpdateProfile.statusResponse) {
      setErrorFullname("Error al actualizar el nombre y apellido");
      return;
    }

    navigation.navigate("information");
  };

  const validateData = () => {
    setErrorFullname("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirm("");
    setErrorAddress("");
    setErrorPhone("");
    setErrorId("");
    let isValid = true;

    if (formData.fullname == "") {
      setErrorFullname("Debes ingresar tu nombre completo");
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos seis carácteres."
      );
      isValid = false;
    }

    if (size(formData.confirm) < 6) {
      setErrorConfirm(
        "Debes ingresar una confirmación de contraseña de al menos seis carácteres."
      );
      isValid = false;
    }

    if (formData.password !== formData.confirm) {
      setErrorPassword("La contraseña y la confirmación no son iguales.");
      setErrorConfirm("La contraseña y la confirmación no son iguales.");
      isValid = false;
    }

    if (formData.address === "") {
      setErrorAddress("Debes ingresar tu dirección");
      isValid = false;
    }

    if (size(formData.phoneNumber) < 7 || size(formData.phoneNumber) > 10) {
      setErrorPhone("Debes ingresar un telefono valido.");
      isValid = false;
    }

    if (formData.id === "") {
      setErrorId("Debes ingresar tu numero de identificacion");
      isValid = false;
    }

    return isValid;
  };
  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingrese su nombre completo"
        errorMessage={errorFullname}
        defaultValue={formData.fullname}
        onChange={(e) => onChange(e, "fullname")}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Ingrese su email"
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Ingrese su contraseña"
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />

      <Input
        containerStyle={styles.input}
        placeholder="Confirme su contraseña"
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        onChange={(e) => onChange(e, "confirm")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />

      <Input
        containerStyle={styles.input}
        placeholder="Ingrese su dirección"
        errorMessage={errorAdress}
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
      />

      <Input
        containerStyle={styles.input}
        keyboardType="phone-pad"
        placeholder="Ingrese su telefono"
        errorMessage={errorPhone}
        defaultValue={formData.phone}
        onChange={(e) => onChange(e, "phoneNumber")}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Ingrese su número de identificación"
        errorMessage={errorId}
        defaultValue={formData.id}
        onChange={(e) => onChange(e, "id")}
      />

      <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doRegisterUser()}
      />

      <Loading isVisible={loading} text="Creando cuenta..." />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    fullname: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    phoneNumber: "",
    id: "",
    uid: "",
  };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
  },
  input: {
    width: "90%",
    margin: 20,
    height: 25,
  },
  btnContainer: {
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    marginVertical: 30,
  },
  btn: {
    backgroundColor: "#41ac88",
  },
  icon: {
    color: "#74445a",
  },
});
