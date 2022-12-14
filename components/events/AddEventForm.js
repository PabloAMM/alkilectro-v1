import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Button, Divider } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import MapView, { Marker } from "react-native-maps";
import { isEmpty, size } from "lodash";
import CurrencyInput from "react-native-currency-input";

import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  const [errorUseTime, setErrorUseTime] = useState(null);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationEvent, setLocationEvent] = useState(null);
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [isVisibleTimePicker, setIsVisibleTimePicker] = useState(false);

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
      documentId: formData.id,
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

    navigation.navigate("events");
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

    if (size(formData.phone) < 10) {
      setErrorPhone("El número de telefono no es valido");
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
     if (!formData.price) {
      toastRef.current.show(
        "El precio del evento esta vacio",
        3000
      );
      isValid = false;
    } 

    if (isEmpty(formData.useTime)) {
      setErrorUseTime("El tiempo de uso en el evento esta vacio");
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
    setErrorUseTime(null);
    setErrorCity(null);
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
        errorUseTime={errorUseTime}
        setIsVisibleMap={setIsVisibleMap}
        locationEvent={locationEvent}
        isVisibleDatePicker={isVisibleDatePicker}
        setIsVisibleDatePicker={setIsVisibleDatePicker}
        isVisibleTimePicker={isVisibleTimePicker}
        setIsVisibleTimePicker={setIsVisibleTimePicker}
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
      <DateEvent
        formData={formData}
        setFormData={setFormData}
        isVisibleDatePicker={isVisibleDatePicker}
        setIsVisibleDatePicker={setIsVisibleDatePicker}
        toastRef={toastRef}
      />
      <TimeEvent
        formData={formData}
        setFormData={setFormData}
        isVisibleTimePicker={isVisibleTimePicker}
        setIsVisibleTimePickerPicker={setIsVisibleTimePicker}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}
function DateEvent({
  formData,
  setFormData,
  isVisibleDatePicker,
  setIsVisibleDatePicker,
  toastRef,
}) {
  const hideDatePicker = () => {
    setIsVisibleDatePicker(false);
  };

  const handleConfirm = (date) => {
    setFormData({ ...formData, deliveryDate: date });
    hideDatePicker();
  };
  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisibleDatePicker}
        mode="date"
        onConfirm={(date) => {
          handleConfirm(date.toDateString());
        }}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
function TimeEvent({
  formData,
  setFormData,
  isVisibleTimePicker,
  setIsVisibleTimePicker,
  toastRef,
}) {
  const hideTimePicker = () => {
    setIsVisibleTimePicker(false);
  };

  const handleConfirm = (date) => {
    setFormData({ ...formData, deliveryTime: date });
    hideTimePicker();
  };
  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisibleTimePicker}
        mode="time"
        onConfirm={(date) => {
          handleConfirm(date.toTimeString());
        }}
        onCancel={hideTimePicker}
      />
    </View>
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
  setIsVisibleDatePicker,
  setIsVisibleTimePicker,
}) {
  const [country, setCountry] = useState("CO");
  const [callingCode, setCallingCode] = useState("57");
  const [price, setPrice] = useState(null);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const hanledPrice = () => {
    setFormData({ ...formData, price: price });
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
        keyboardType="number-pad"
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
          color: locationEvent ? "#4c7464" : "#c2c2c2",
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
          color: formData.deliveryDate ? "#4c7464" : "#c2c2c2",
          onPress: () => setIsVisibleDatePicker(true),
        }}
      />
      <Input
        placeholder="Hora de entrega"
        defaultValue={formData.deliveryTime}
        onChange={(e) => onChange(e, "deliveryTime")}
        errorMessage={errorDeliveryTime}
        rightIcon={{
          type: "material-community",
          name: "clock-outline",
          color: formData.deliveryTime ? "#4c7464" : "#c2c2c2",
          onPress: () => setIsVisibleTimePicker(true),
        }}
      />
      <Input
        placeholder="Equipos requeridos"
        defaultValue={formData.equipments}
        onChange={(e) => onChange(e, "equipments")}
        errorMessage={errorEquipments}
      />
      <View style={styles.viewCurrencyInput}>
        <CurrencyInput
          placeholder="Valor a pagar"
          value={price}
          editable={true}
          prefix="$"
          separator=","
          delimiter="."
          precision={0}
          minValue={0}
          defaultValue={price}
          keyboardType="numeric"
          onChangeValue={setPrice}
          onChangeText={hanledPrice}
          style={styles.CurrencyInput}
        />
        <Divider style={styles.divider} />
      </View>
      <Input
        placeholder="Tiempo de uso en días"
        defaultValue={formData.useTime}
        keyboardType="number-pad"
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
  viewCurrencyInput: {
    flex: 1,
    marginTop: 1,
    alignContent: "flex-start",
  },
  CurrencyInput: {
    fontSize: 18,
    marginLeft: 10,
  },
  divider: {
    backgroundColor: "#6e7a7e",
    margin: 10,
    paddingVertical: 0.5,
  },
});
