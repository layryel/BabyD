import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { doc, updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';

export default function EditarUsuarioScreen({ route, navigation }) {
  const { usuario } = route.params; // Certifique-se de que 'usuario' está sendo passado corretamente
  const [nome, setNome] = useState(usuario.nome);
  const [endereco, setEndereco] = useState(usuario.endereco);
  const [email, setEmail] = useState(usuario.email);
  const [cpf, setCpf] = useState(usuario.cpf);
  const [rg, setRg] = useState(usuario.rg);
  const [imagem, setImagem] = useState(usuario.imageUrl); // Puxe a imagem aqui
  const [atualizado, setAtualizado] = useState(false);

  const salvarAlteracoes = async () => {
    try {
      const usuarioRef = doc(db, "BABYD", usuario.id);
      await updateDoc(usuarioRef, { nome, endereco, email, cpf, rg, imageUrl: imagem }); // Não esqueça de atualizar a imagem
      
      setAtualizado(true);
      
      setTimeout(() => {
        setAtualizado(false);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>BabyD</Text>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title2}>Registro Realizado:</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.centeredText}>Informações do Responsável:</Text>
      </View>
         
           {/* Exibir a imagem do usuário */}
        {imagem ? (
          <Image
            source={{ uri: imagem }} // Exibe a imagem do usuário
            style={styles.userImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.noImageText}>Nenhuma imagem disponível</Text>
        )}

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <FontAwesome name="pencil" size={20} color="#777" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
          />
          <FontAwesome name="pencil" size={20} color="#777" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <FontAwesome name="pencil" size={20} color="#777" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />
          <FontAwesome name="pencil" size={20} color="#777" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="RG"
            value={rg}
            onChangeText={setRg}
          />
          <FontAwesome name="pencil" size={20} color="#777" style={styles.icon} />
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={salvarAlteracoes}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

        {atualizado && (
          <Text style={styles.successMessage}>Dados atualizados com sucesso!</Text>
        )}
      </View>
           
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./assets/footer.png')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    width: '100%',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title2: {
    fontSize: 25,
    textAlign: 'center',
    color: "#c1ff72",
    fontWeight: 'bold',
    marginTop: -10,
  },
  infoContainer: {
    marginTop: 350,
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#d2bbff",
  },
  card: {
    width: '90%',
    maxWidth: 320,
    position: 'absolute',
    bottom: 80, 
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#FB9ED7',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  successMessage: {
    color: '#4CAF50',
    marginTop: 10,
    fontSize: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  userImage: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginTop: -318,
  },
  noImageText: {
    color: '#777',
    marginBottom: 10,
  },
  bottomImageContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bottomImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
