import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./src/style";

// Criação da tela inicial
export const InitialScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Botão menu */}
        <TouchableOpacity
          style={styles.menuButton}
          onPressIn={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navText}>BabyD</Text>
        <View style={styles.logoContainer}>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title1}>
          Sistema <Text style={styles.highlight}>BabyD</Text>
        </Text>
      </View>
      <Text style={styles.description}>
        Tecnologia de reconhecimento facial para {"\n"}os responsáveis,
        auxiliando na segurança das {"\n"} crianças e agilidade dentro das
        creches.
      </Text>
      <Image
        source={require("./assets/inicio.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <TouchableOpacity
          style={[styles.button, { elevation: 5 }]}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
