import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const CadastroSuccess = ({ route, navigation }) => {
  const params = route?.params || {};
  const { nome, endereco, email, rg, cpf, imageUrl } = params;

  return (
    <View style={styles.container}>
      {/* Cabeçalho com título e logo */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>BabyD</Text>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.title2}>Registro realizado:</Text>
      <Text style={styles.centeredText}>Informações do Responsável:</Text>

      {imageUrl && (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
      )}
      
      {/* Card para exibir os dados do usuário */}
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nome" value={nome} editable={false} />
        <TextInput style={styles.input} placeholder="Endereço" value={endereco} editable={false} />
        <TextInput style={styles.input} placeholder="Email" value={email} editable={false} />
        <TextInput style={styles.input} placeholder="RG" value={rg} editable={false} />
        <TextInput style={styles.input} placeholder="CPF" value={cpf} editable={false} />

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={() => navigation.navigate('Ínicio')}
        >
          <Text style={styles.saveButtonText}>Fechar</Text>
        </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: -10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    width: '100%',
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
    flex: 1,
    color: "#c1ff72",
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 250,
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FB9ED7', 
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#d2bbff",
    marginBottom: -320,
  },
  card: {
    width: '90%',
    maxWidth: 320,
    position: 'absolute',
    bottom: 50,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    zIndex: 2,
  },
  backButton: {
    marginRight: 10,
  },
  
});

export default CadastroSuccess;
