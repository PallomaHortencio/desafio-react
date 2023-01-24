import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  }, []);

  return (
    <View>
      <Text>Fotos</Text>
    </View>
  );
};

export default Fotos;
