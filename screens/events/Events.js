import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { size } from "lodash";

import  {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../../utils/firebase'

import ListEvents from "./ListEvents";
import { isUserLogged, getCurrentUser } from "../../utils/actions";
import Loading from "../../components/loading/Loading";

export default function Events({ navigation }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     onAuthStateChanged(auth,(userInfo) => {
        userInfo ? setUser(true) : setUser(false)
    })
}, [])


  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return (
    <View style={styles.viewBody}>
      {size(events) > 0 ? (
        <ListEvents
          restaurants={events}
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
});
