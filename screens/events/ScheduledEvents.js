import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Icon } from "react-native-elements";
import { get, set, size } from "lodash";
import { useFocusEffect } from "@react-navigation/native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";

import ListEvents from "../../components/events/ListEvents";
import { getEvents, getMoreEvents } from "../../utils/actions";
import Loading from "../../components/loading/Loading";

export default function ScheduledEvents({ navigation }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [startEvent, setStartEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const limitEvents = 7;

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getEvents(limitEvents, "1");
         if (response.statusResponse) {
          setStartEvent(response.startEvent);
          setEvents(response.events);
        }

        setLoading(false);
      }
      getData();
    }, [])
  );

  const handleLoadMore = async () => {
    if (!startEvent) {
      return;
    }

    setLoading(true);
    const response = await getMoreEvents(limitEvents, startEvent, "2");
    if (response.statusResponse) {
      setStartEvent(response.startEvent);
      setEvents([...events, ...response.events]);
    }
    setLoading(false);
  };
  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return (
    <View style={styles.viewBody}>
      {size(events) > 0 ? (
        <ListEvents
          events={events}
          navigation={navigation}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>No hay eventos programados.</Text>
        </View>
      )}
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#4c7464"
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-event")}
        />
      )}
      <Loading isVisible={loading} text="Cargando eventos..." />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btnContainer: {
    position: "absolute",
    bottom: 12,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
