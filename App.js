import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [inputTexto, setInputTexto] = useState("");
  const [nombreStorage, setNombreStorage] = useState("");

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem("nombre", inputTexto);
      setNombreStorage(inputTexto);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem("nombre");
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem("nombre");
      setNombreStorage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.contenedor}>
        {nombreStorage ? <Text>Hola: {nombreStorage} </Text> : null}
        <TextInput
          onChangeText={(texto) => setInputTexto(texto)}
          style={styles.input}
          placeholder="Escribe tu nombre"
        />

        <Button
          title="Guardar"
          color="#409DCF"
          onPress={() => guardarDatos()}
        />

        {nombreStorage ? (
          <TouchableHighlight
            style={styles.btnEliminar}
            onPress={() => eliminarDatos()}
          >
            <Text style={styles.txtEliminar}>Eliminar nombre &times;</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#666",
    borderBottomWidth: 1,
    width: "100%",
    height: 40,
    marginVertical: 20,
  },
  btnEliminar: {
    backgroundColor: "red",
    marginTop: 30,
    padding: 10,
  },
  txtEliminar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    width: 300,
  },
});
