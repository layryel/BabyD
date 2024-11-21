import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Modal, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { TextInputMask } from 'react-native-masked-text'; // Importando a máscara
import { getDownloadURL } from "firebase/storage"; // Importar a função getDownloadURL

export const Cadastro = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [senhaValida, setSenhaValida] = useState(true);
  const [senhaFocada, setSenhaFocada] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false); // Estado para visibilidade da senha
  const [image, setImage] = useState(null); 

  const storage = getStorage();

  const salvarResposta = async (concorda) => {
    const userId = "usuarioAtual"; 
    try {
      await setDoc(doc(db, "resposta_termos", userId), {
        concorda: concorda,
        dataHora: new Date().toISOString(),
        userId: userId,
      });
      await AsyncStorage.setItem('respondeuTermos', 'true');
      console.log("Resposta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a resposta:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleRegister = async () => {
    if (!nome || !endereco || !email || !senha || !rg || !cpf || !image) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e selecione uma foto.");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }
  
    if (senha.length !== 6) {  // Verifica se a senha tem exatamente 6 caracteres
      Alert.alert("Erro", "A senha deve ter exatamente 6 caracteres.");
      return;
    }
  
    setSenhaValida(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
  
      let imageUrl = null;
  
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      await setDoc(doc(db, "BABYD", user.uid), {
        nome: nome,
        endereco: endereco,
        email: email,
        rg: rg,
        cpf: cpf,
        dataCadastro: new Date().toISOString(),
        imageUrl: imageUrl || null,
        userId: user.uid,
      });
  
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      setNome("");
      setEndereco("");
      setEmail("");
      setSenha("");
      setRg("");
      setCpf("");
      setImage(null);
  
      // Verifica o tipo de email e direciona para a tela correspondente
      if (email.endsWith("@etec.sp.gov.br")) {
        navigation.navigate("HistoricoResponsaveis", { userId: user.uid });
      } else if (email.endsWith("@gmail.com")) {
        navigation.navigate("CadastroSuccess", { 
          nome, endereco, email, rg, cpf, imageUrl: imageUrl || null 
        });
      } else {
        Alert.alert("Erro", "Email não reconhecido. Tente um email institucional ou pessoal.");
      }
  
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      Alert.alert("Erro", "Erro ao cadastrar usuário. Tente novamente.");
    }
  };
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("É necessário permitir o acesso à galeria.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);  // Captura o URI da imagem
      console.log("Imagem selecionada:", result.assets[0].uri);  // Verifique se o URI é impresso no console
    } else {
      console.log("Seleção de imagem cancelada");
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setModalVisible(true); 
    }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.navbarText}>Cadastro</Text>
            <Text style={styles.navbarText1}>BabyD</Text>
            <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>Faça seu Cadastro:</Text>
          </View>

          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
            <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setSenhaValida(text.length >= 6);
              }}
              secureTextEntry={!senhaVisivel} // Alterna entre exibir ou ocultar a senha
              onFocus={() => setSenhaFocada(true)}
              onBlur={() => setSenhaFocada(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSenhaVisivel(!senhaVisivel)} // Alterna a visibilidade da senha
            >
              <Ionicons
                name={senhaVisivel ? "eye-off" : "eye"} // Muda o ícone
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {senhaFocada && !senhaValida && (
            <Text style={styles.errorText}>A senha deve ter 6 caracteres.</Text>
          )}
               <TextInputMask
              type={'custom'}
              options={{ mask: '99.999.999-9' }}
              style={styles.input}
              placeholder="RG"
              value={rg}
              onChangeText={setRg}
            />
            <TextInputMask
              type={'cpf'}
              style={styles.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já possui cadastro? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>faça login aqui!</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1} onPress={pickImage}>
                <Text style={styles.buttonText}>Escolher Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} elevation={3} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>

             {/* Exibir a imagem selecionada */}
         {image && (
           <View style={styles.imageContainer}>
           <Image source={{ uri: image }} style={styles.selectedImage} />
           </View>
          )}
          
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Você concorda com os termos de uso?</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => salvarResposta(true)}>
                    <Text style={styles.buttonText}>Concordo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={() => salvarResposta(false)}>
                    <Text style={styles.buttonText}>Não Concordo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Alinha os itens verticalmente no centro
    paddingBottom: 50, // Adiciona um espaço extra na parte inferior para evitar que o conteúdo fique escondido pelo teclado
  },
  navbar: {
    backgroundColor: '#FB9ED7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 260,
    marginBottom: 90,
    ...Platform.select({
      android: {
        elevation: 5, // Sombra para Android
      },
      ios: {
        shadowColor: '#000', // Cor da sombra para iOS
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.5, // Opacidade da sombra
        shadowRadius: 2, // Raio da sombra
      },
    }),
  },
  navbarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: -170,
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  navbarText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: -143,
    marginTop: -150,
  },
  logoTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, 
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#c1ff72",
    marginTop: -30,
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: -140,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row', // Adiciona esta linha para alinhar os botões horizontalmente
    justifyContent: 'space-between', // Distribui o espaço entre os botões
    marginTop: 10,
  },
  button1: {
    paddingVertical: 10,
    backgroundColor: '#FB9ED7', 
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    // Sombra para Android e iOS
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
  button: {
    paddingVertical: 10,
    backgroundColor: '#FB9ED7', 
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    // Sombra para Android e iOS
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginText: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    color: "#9CE4FD",
    fontWeight: "bold",
    fontSize: 16,
  },
  menuButton: {
    padding: 10,
    marginTop: -150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#FB9ED7',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width: '45%',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    marginLeft: -47,
    padding: 10,
    marginTop: -10, // ajuste para subir o ícon
  },
  passwordContainer: {
    flexDirection: 'row', // Coloca o ícone ao lado do campo de senha
    alignItems: 'center',
  },
});
