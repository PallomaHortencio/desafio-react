import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function ImagePickerExample() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [foto, setFoto] = useState();
  const [titulo, onChangeText] = useState();

  const obterTitulo = useEffect(() => {
    async function verificarPermissao() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    verificarPermissao();
  }, []);

  const acessarCamera = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setFoto(image.assets[0].uri);
  };

  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      let localizacaoAtual = await Location.getCurrentPositionAsync({});

      setMinhaLocalizacao(localizacaoAtual.coords);
    }
    obterLocalizacao();
  }, []);
  console.log(minhaLocalizacao);

  const regiaoInicial = {
    latitude: -23.533773,
    longitude: -46.65529,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const [localizacao, setLocalizacao] = useState();

  const marcarLocal = () => {
    console.log(minhaLocalizacao);
    setLocalizacao({
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      ...minhaLocalizacao,
    });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <View style={estilos.borda}>
          <TextInput
            style={estilos.titulo}
            onChangeText={onChangeText}
            placeholder="Escreva o nome do lugar"
          />
        </View>

        <View style={estilos.foto}>
          <Image source={{ uri: foto }} style={estilos.imagem} />
        </View>

        <View style={estilos.botao}>
          <Button
            title="Tirar uma foto"
            onPress={acessarCamera}
            color="white"
          />
        </View>

        <View>
          <View>
            <MapView
              style={estilos.mapa}
              region={localizacao ?? regiaoInicial}
              mapType="standard"
            >
              {localizacao && (
                <Marker
                  coordinate={localizacao}
                  title="aquiii"
                  onPress={(e) => console.log(e.nativeEvent)}
                />
              )}
            </MapView>
            <View style={estilos.botao}>
              <Button
                title="Localizar no mapa"
                onPress={marcarLocal}
                color="white"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imagem: {
    width: 300,
    height: 200,
    marginVertical: 16,
  },
  mapa: {
    width: 300,
    height: 200,
    marginVertical: 16,
  },
  titulo: {
    fontSize: "20px",
    color: "green",
  },
  borda: {
    borderWidth: "1px",
    width: 300,
    height: 30,
    alignItems: "center",
  },
  botao: {
    borderWidth: "1px",
    width: 300,
    backgroundColor: "blue",
  },
});
