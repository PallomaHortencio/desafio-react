import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

const Fotos = () => {
  const [listaFotos, setListaFotos] = useState([]);

  useEffect(() => {
    async function carregarFotos() {
      try {
        const dados = await AsyncStorage.getItem("@fotos");
        const fotos = JSON.parse(dados);

        if (dados != null) {
          setListaFotos(fotos);
        }
        console.log(dados);
      } catch (error) {
        console.log("Deu ruim: " + error.message);
      }
    }
    carregarFotos;
    console.log(listaFotos);
  }, []);

  return (
    <View>
      <Text>Fotos</Text>
      <Image source={{ uri: listaFotos }} style={estilos.imagem} />
    </View>
  );
};

export default Fotos;

const estilos = StyleSheet.create({
  imagem: {
    width: 300,
    height: 200,
    marginVertical: 16,
  },
});
