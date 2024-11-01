import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function HistoricoResponsaveis() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const usuariosSnapshot = await getDocs(collection(db, "BABYD"));
      const usuariosList = usuariosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsuarios(usuariosList);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsuarios(); // Atualiza os dados sempre que a tela é focada
    }, [])
  );

  const abrirDetalhesUsuario = (usuario) => {
    navigation.navigate('EditarUsuarioScreen', { usuario });
  };

  const excluirUsuario = async (id, imageUrl, userId) => {
    try {
      // Excluir a imagem do Storage
      if (imageUrl) {
        const storage = getStorage();
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      // Excluir o documento do Firestore
      await deleteDoc(doc(db, "BABYD", id));
      
      // Excluir o usuário da autenticação, se tiver o userId
      if (userId) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user && user.uid === userId) {
          await deleteUser(user);
        }
      }

      // Atualizar o estado local, removendo o usuário
      setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const confirmarExclusao = (id, imageUrl, userId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir", onPress: () => excluirUsuario(id, imageUrl, userId)
        }
      ],
      { cancelable: false }
    );
  };

  const renderUsuario = ({ item }) => (
    <TouchableOpacity style={styles.usuarioContainer} onPress={() => abrirDetalhesUsuario(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.usuarioImage} />
      <Text style={styles.usuarioNome}>{item.nome}</Text>
      <Text style={styles.usuarioEmail}>{item.email || 'Email não disponível'}</Text>
      
      {/* Ícone de lixeira */}
      <TouchableOpacity style={styles.deleteIcon} onPress={() => confirmarExclusao(item.id, item.imageUrl, item.userId)}>
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Ínicio')}>
          <FontAwesome name="arrow-left" size={24} color="white" />
          <Text style={styles.title}>BabyD</Text>
        </TouchableOpacity>

        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.subTitle}>Histórico de Responsáveis</Text>
      </View>

      <FlatList
        data={usuarios}
        renderItem={renderUsuario}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.usuarioList}
        numColumns={2} 
      />

      {/* Botão de Escanear Rosto */}
      <TouchableOpacity style={styles.scanButton} onPress={() => console.log('Escanear rosto')}>
        <Text style={styles.scanButtonText}>Escanear Rosto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FB9ED7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 260,
    marginBottom: 50,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
    }),
  },
  menuIcon: {
    position: "absolute",
    left: 20,
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginLeft: 170,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 40,
    color: 'white',
    marginTop: 90,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 15,
    top: 30,
  },
  usuarioContainer: { 
    alignItems: 'center', 
    marginBottom: 15, 
    padding: 10,
    flex: 1, // Para expandir a largura e dividir o espaço em duas colunas
  },
  usuarioImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 25, 
    marginRight: 10 
  },
  usuarioNome: { 
    fontSize: 17, 
    color: 'black', 
    fontWeight: 'bold' 
  },
  usuarioEmail: {
    fontSize: 15,
    color: 'gray',
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  usuarioList: { 
    paddingHorizontal: 20, 
    paddingTop: -80 
  },
  scanButton: {
    backgroundColor: '#FB9ED7',
    paddingVertical: 10,
    marginBottom: 40,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
