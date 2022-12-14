import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Toast from "react-native-easy-toast";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AddEventForm from "./AddEventForm";
import Loading from "../loading/Loading";
import { formatPhone } from "../../utils/helpers";

export default function ListEvents({ events, navigation, handleLoadMore }) {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();

  return (
    <View>
      <FlatList
        data={events}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(event) => <Event event={event} navigation={navigation} />}
      />
    </View>
  );
}

function Event({ event, navigation, handleLoadMore }) {
  const { documentId, name,deliveryDate, address, phone, callingCode, notes } = event.item;
  console.log("items",event.item)
  const goEvent = () => {
    navigation.navigate("event", { documentId, name });
  };
  return (
    <TouchableOpacity onPress={goEvent}>
      <View style={styles.viewEvent}>
        <Text style={styles.eventName}>Nombre: {name}</Text>
        <Text style={styles.eventInformation}>Fecha de entrega:{deliveryDate}</Text>
        <Text style={styles.eventInformation}>Dirección:{address}</Text>
        <Text style={styles.eventInformation}>Telefono:
          {formatPhone(callingCode, phone)}
        </Text>
        <Text style={styles.eventNotes}>Nota:
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
