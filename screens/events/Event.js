import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect,useState } from "react";

import { getDocumentById } from "../../utils/actions";
import Loading from "../../components/loading/Loading";

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
    <View>
      <Text>{event.notes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
