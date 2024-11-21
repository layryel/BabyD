// Importando as funções necessárias
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Certifique-se de importar o objeto 'auth'
import { doc, getDoc } from "firebase/firestore"; // Importe funções do Firestore
import { db } from "./firebaseConfig"; // Importe seu db do Firebase

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para realizar o login com o Firebase Authentication
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "BABYD", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

      // Exibe mensagem de sucesso
      Alert.alert("Sucesso", "Login realizado com sucesso!");

        // Verifica o domínio do email
        if (email.endsWith("@etec.sp.gov.br")) {
          // Redireciona para a tela de Histórico de Responsáveis
          navigation.navigate("HistoricoResponsaveis");
        } else if (email.endsWith("@gmail.com")) {
          // Redireciona para a tela CadastroSuccess
          navigation.navigate("CadastroSuccess", {
            nome: userData.nome,
            endereco: userData.endereco,
            email: user.email,
            rg: userData.rg,
            cpf: userData.cpf,
            imageUrl: userData.imageUrl,
          });
        } else {
          Alert.alert("Erro", "Email não autorizado.");
        }

      // Limpar os campos após o login bem-sucedido
      setEmail("");
      setPassword("");

      } else {
        Alert.alert("Erro", "Dados do usuário não encontrados.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Email ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerLeftText}>Login</Text>
        <Text style={styles.headerText}>BabyD</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoText}>Faça seu Login:</Text>
        </View>
      </View>

      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={[styles.input, styles.lastInput]}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.linkContainer}>
          <Text style={styles.linkTextBlack}>Não possui cadastro? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.linkTextBlue}>
              cadastre-se aqui!
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>"BabyD: o olhar que cuida."</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FB9ED7",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 260,
    marginBottom: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -140,
  },
  headerLeftText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    position: "absolute",
    left: 50,
    top: 10,
    marginTop: 110,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -90,
  },
  menuIcon: {
    position: "absolute",
    left: 20,
    top: 48,
  },
  logo: {
    width: 200,
    height: 250,
  },
  logoTextContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    color: "#c1ff72",
    marginTop: -20,
    fontWeight: "bold",
  },
  loginContainer: {
    width: "90%",
    padding: 20,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    left: 25,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
  },
  lastInput: {
    marginBottom: 20,
  },
  linkTextBlack: {
    color: "#000000",
    marginBottom: 20,
    fontSize: 16,
  },
  linkTextBlue: {
    color: "#9CE4FD",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FB9ED7",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  footerText: {
    color: "#d2bbff",
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 20,
    textAlign: "center",
  },
});
