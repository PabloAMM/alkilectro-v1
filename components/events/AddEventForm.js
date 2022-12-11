import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import MapView, { Marker } from "react-native-maps";
import { isEmpty } from "lodash";

import Modal from "../../utils/Modal";
import { getCurrentLocation } from "../../utils/helpers";
import { addDocumentWithoutId, getCurrentUser } from "../../utils/actions";

export default function AddEventForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorNeighborhood, setErrorNeighborhood] = useState(null);
  const [errorCity, setErrorCity] = useState(null);
  const [errorDeliveryDate, setErrorDeliveryDate] = useState(null);
  const [errorDeliveryTime, setErrorDeliveryTime] = useState(null);
  const [errorEquipments, setErrorEquipments] = useState(null);
  const [errorPrice, setErrorPrice] = useState(null);
  const [errorUseTime, setErroruseTime] = useState(null);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationEvent, setLocationEvent] = useState(null);

  const addEvent = async () => {
    if (!validForm()) {
      return;
    }

    setLoading(true);

    const event = {
      name: formData.name,
      id: formData.id,
      address: formData.address,
      country: formData.country,
      callingCode: formData.callingCode,
      phone: formData.phone,
      city: formData.city,
      neighborhood: formData.neighborhood,
      location: locationEvent,
      deliveryDate: formData.deliveryDate,
      deliveryTime: formData.deliveryTime,
      equipments: formData.equipments,
      price: formData.price,
      useTime: formData.useTime,
      id: formData.id,
      notes: formData.notes,
      createAt: new Date(),
      createBy: getCurrentUser().uid,
    };

    const responseAddDocument = await addDocumentWithoutId("events", event);
    setLoading(false);
    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "Error al grabar el evento, por favor intenta más tarde.",
        3000
      );
      return;
    }

    navigation.navigate("events")
  };

  const validForm = () => {
    clearErrors();
    let isValid = true;
    if (isEmpty(formData.name)) {
      setErrorName("El nombre del cliente esta vacio");
      isValid = false;
    }
    if (isEmpty(formData.id)) {
      setErrorId("El numero de identificación esta vacio");
      isValid = false;
    }
    if (isEmpty(formData.phone)) {
      setErrorPhone("El número de telefono esta vacio");
      isValid = false;
    }
    if (isEmpty(formData.address)) {
      setErrorAddress("La dirección esta vacia");
      isValid = false;
    }
    if (isEmpty(formData.neighborhood)) {
      setErrorNeighborhood("El nombre del barrio esta vacio");
      isValid = false;
    }
    if (isEmpty(formData.city)) {
      setErrorCity("El nombre del municipio/ciudad esta vacio");
      isValid = false;
    }
    if (isEmpty(formData.deliveryDate)) {
      setErrorDeliveryDate("La fecha de entrega esta vacia");
      isValid = false;
    }
    if (isEmpty(formData.deliveryTime)) {
      setErrorDeliveryTime("La hora de entrega esta vacia");
      isValid = false;
    }
    if (isEmpty(formData.equipments)) {
      setErrorEquipments("No se ha ingresado equipo para el evento");
      isValid = false;
    }
    if (isEmpty(formData.price)) {
      setErrorPrice("El precio del evento esta vacio");
      isValid = false;
    }
    if (isEmpty(formData.useTime)) {
      setErroruseTime("El tiempo de uso en el evento esta vacio");
      isValid = false;
    }
    if (!locationEvent) {
      toastRef.current.show(
        "Debes localizar el lugar del evento en el mapa",
        3000
      );
      isValid = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    setErrorName(null);
    setErrorId(null);
    setErrorPhone(null);
    setErrorAddress(null);
    setErrorNeighborhood(null);
    setErrorDeliveryDate(null);
    setErrorDeliveryTime(null);
    setErrorEquipments(null);
    setErrorPrice(null);
    setErroruseTime(null);
  };
  return (
    <ScrollView style={styles.viewContainer}>
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorId={errorId}
        errorPhone={errorPhone}
        errorAddress={errorAddress}
        errorNeighborhood={errorNeighborhood}
        errorCity={errorCity}
        errorDeliveryDate={errorDeliveryDate}
        errorDeliveryTime={errorDeliveryTime}
        errorEquipments={errorEquipments}
        errorPrice={errorPrice}
        errorUseTime={errorUseTime}
        setIsVisibleMap={setIsVisibleMap}
        locationEvent={locationEvent}
      />
      <Button
        title="Crear Evento"
        onPress={addEvent}
        buttonStyle={styles.btnAddEvent}
      />
      <MapEvent
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationEvent={setLocationEvent}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function MapEvent({
  isVisibleMap,
  setIsVisibleMap,
  setLocationEvent,
  toastRef,
}) {
  const [newRegion, setNewRegion] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationEvent(newRegion);
    toastRef.current.show("Localización guardada correctamente.", 3000);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
      <View>
        {newRegion && (
          <MapView
            style={styles.mapStyle}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
          >
            <Marker
              coordinate={{
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              }}
              draggable={true}
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicación"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar Ubicación"
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

function FormAdd({
  formData,
  setFormData,
  errorName,
  errorId,
  errorPhone,
  errorAddress,
  errorNeighborhood,
  errorCity,
  errorDeliveryDate,
  errorDeliveryTime,
  errorEquipments,
  errorPrice,
  errorUseTime,
  setIsVisibleMap,
  locationEvent,
}) {
  const [country, setCountry] = useState("CO");
  const [callingCode, setCallingCode] = useState("57");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre cliente"
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorName}
      />
      <Input
        placeholder="CC/NIT"
        defaultValue={formData.id}
        onChange={(e) => onChange(e, "id")}
        errorMessage={errorId}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerButtonStyle={styles.CountryPicker}
          countryCode={formData.country}
          onSelect={(country) => {
            setFormData({
              ...formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
          }}
        />
        <Input
          placeholder="Telefono"
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          errorMessage={errorPhone}
          keyboardType="phone-pad"
          containerStyle={styles.inputCellPhone}
        />
      </View>

      <Input
        placeholder="Dirección"
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationEvent ? "#442484" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Barrio"
        defaultValue={formData.neighborhood}
        onChange={(e) => onChange(e, "neighborhood")}
        errorMessage={errorNeighborhood}
      />
      <Input
        placeholder="Municipio"
        defaultValue={formData.city}
        onChange={(e) => onChange(e, "city")}
        errorMessage={errorCity}
      />
      <Input
        placeholder="Fecha de entrega"
        defaultValue={formData.deliveryDate}
        onChange={(e) => onChange(e, "deliveryDate")}
        errorMessage={errorDeliveryDate}
        rightIcon={{
          type: "material-community",
          name: "calendar-range",
          color: "#c2c2c2",
        }}
      />
      <Input
        placeholder="Hora de entrega"
        defaultValue={formData.deliveryTime}
        onChange={(e) => onChange(e, "deliveryTime")}
        errorMessage={errorDeliveryTime}
      />
      <Input
        placeholder="Equipos requeridos"
        defaultValue={formData.equipments}
        onChange={(e) => onChange(e, "equipments")}
        errorMessage={errorEquipments}
      />
      <Input
        placeholder="Valor a pagar"
        defaultValue={formData.price}
        onChange={(e) => onChange(e, "price")}
        errorMessage={errorPrice}
      />
      <Input
        placeholder="Tiempo de uso en días"
        defaultValue={formData.useTime}
        onChange={(e) => onChange(e, "useTime")}
        errorMessage={errorUseTime}
      />
      <Input
        placeholder="Notas"
        multiline
        containerStyle={styles.inputNotas}
        defaultValue={formData.notes}
        onChange={(e) => onChange(e, "notes")}
      />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    name: "",
    id: "",
    country: "CO",
    callingCode: "57",
    phone: "",
    address: "",
    neighborhood: "",
    city: "",
    deliveryDate: "",
    deliveryTime: "",
    equipments: "",
    price: "",
    useTime: "",
    notes: "",
  };
};

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
  },
  viewForm: {
    marginHorizontal: 10,
  },
  inputNotas: {
    height: 100,
    width: "100%",
  },
  phoneView: {
    width: "80%",
    flexDirection: "row",
  },
  inputCellPhone: {
    width: "80%",
  },
  btnAddEvent: {
    margin: 20,
    backgroundColor: "#4c7464",
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a65273",
  },
  viewMapBtnSave: {
    backgroundColor: "#442484",
  },
});
