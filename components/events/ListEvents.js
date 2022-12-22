import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { size } from "lodash";



import { formatPhone } from "../../utils/helpers";

export default function ListEvents({ events, navigation, handleLoadMore }) {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}                     
        renderItem={(event) => (<Event event={event} navigation={navigation} />)}
      />
    </View>
  );
}

function Event({ event, navigation, handleLoadMore }) {
  const { id,documentId, name, deliveryDate, address, phone, callingCode, notes } =
    event.item;

  const goEvent = () => {
    navigation.navigate("event", { id, name });
  };
  return (
    <TouchableOpacity onPress={goEvent}>
      <View style={styles.viewEvent}>
        <Text style={styles.eventName}>Nombre: {name}</Text>
        <Text style={styles.eventInformation}>
          Fecha de entrega:{deliveryDate}
        </Text>
        <Text style={styles.eventInformation}>Dirección:{address}</Text>
        <Text style={styles.eventInformation}>
          Telefono:
          {formatPhone(callingCode, phone)}
        </Text>
        <Text style={styles.eventNotes}>
          Nota:
          {size(notes) > 0 ? `${notes.substr(0, 60)}...` : notes}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewEvent: {
    flexDirection: "column",
    margin: 10,
  },
  eventName: {
    fontWeight: "bold",
  },
  eventInformation: {
    paddingTop: 2,
    color: "grey",
  },
  eventNotes: {
    paddingTop: 2,
    color: "grey",
    width: "75%",
  },
});
