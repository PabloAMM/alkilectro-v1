import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { getDocumentById } from "../../utils/actions";
import Loading from "../../components/loading/Loading";
import { Input } from "react-native-elements";

export default function Event({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const { id, name } = route.params;

  navigation.setOptions({ title: name });

  useEffect(() => {
    (async () => {
      const response = await getDocumentById("events", id);

      if (response.statusResponse) {
        setEvent(response.document);
      } else {
        setEvent({});
        Alert.alert(
          "Ocurrió un problema cargando el evento, intente mas tarde"
        );
      }
    })();
  }, []);

  if (!event) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <ScrollView style={styles.viewBody}>
      <TitleEvent
        name={event.name}
        description={event.notes}
      />
    </ScrollView>
  );
}

function TitleEvent({ name, description }) {
  return (
    <View style={styles.viewEventTitle}>
      <Text style={styles.nameEvent}>{name}</Text>
      <Text style={styles.descriptionEvent}>{description}</Text>
      <Input>{description}</Input>
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  viewEventTitle: {
    padding: 15
  },
  nameEvent: {
    fontWeight: "bold"
  },
  descriptionEvent: {
    marginTop: 5,
    color: "gray",
    textAlign: "justify"
  }
});
