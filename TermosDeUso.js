import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

export const TermosDeUso = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/footer.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.menuButton}
            onPressIn={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>BabyD</Text>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
         </View>
        <View style={styles.centeredView}>
          <Text style={styles.centeredText}>TERMOS DE USO</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.textContent}>
            Nós somos a BabyD, um sistema que surgiu de um projeto de TCC
            (Trabalho de Conclusão de Curso), desenvolvido em 2024 por um trio
            de mulheres! O foco do nosso projeto é suprir necessidades
            específicas relacionadas à segurança e identificação nas
            instituições de ensino. Para mais informações ou para entrar em
            contato conosco, utilize nossos canais disponíveis no Github,
            LinkedIn ou e-mail.
            {"\n\n"}
            <Text style={styles.sectionTitle}>• Dados Coletados:</Text>
            {"\n\n"}
            Para utilizar a aplicação, coletamos alguns dados da escola,
            responsáveis e da criança. É necessário o cadastro da instituição e
            dos responsáveis autorizados, sendo necessário fornecer os seguintes
            documentos e informações: nome da criança e do responsável,
            documentos de identificação, características faciais, imagens do
            rosto, endereço, entre outros.
            {"\n\n"}
            <Text style={styles.sectionTitle}>
              • Método de Coleta de Dados:
            </Text>
            {"\n\n"}
            Esses dados são coletados durante o processo de cadastro, conforme
            as permissões concedidas pelo usuário. Para usufruir de todas as
            funcionalidades da aplicação, é necessário realizar o cadastro tanto
            do responsável quanto da instituição, incluindo o registro facial do
            responsável e a inserção de dados complementares pela escola ou
            responsável.
            {"\n\n"}
            <Text style={styles.sectionTitle}>
              • Motivo da Coleta de Dados:
            </Text>
            {"\n\n"}
            Coletamos esses dados para garantir uma identificação segura dos
            responsáveis autorizados. A identificação apenas pela face seria
            superficial e não ofereceria a segurança necessária. Portanto,
            coletamos informações adicionais para um maior controle de
            parentesco e segurança.
            {"\n\n"}
            <Text style={styles.sectionTitle}>
              • Cancelamento e Reativação de Conta:
            </Text>
            {"\n\n"}
            Ao final do ano letivo, todos os dados serão reiniciados,
            necessitando de rematrícula no ano seguinte, sujeita a pagamento com
            correção monetária. Para a reativação da conta, será necessário
            registrar novamente a face, a fim de reduzir erros caso haja
            mudanças no período.
            {"\n\n"}
            <Text style={styles.sectionTitle}>
              • Compartilhamento de Dados com Terceiros:
            </Text>
            {"\n\n"}
            Os dados coletados são armazenados no banco de dados do Firebase,
Firestore. As imagens faciais passam pela biblioteca OpenCV.
Consulte a <Text style={styles.link} onPress={() => Linking.openURL('https://opencv.org/documentation/')}>documentação do OpenCV</Text> para mais detalhes. Todos os dados, incluindo as características do
reconhecimento facial, são tratados e armazenados de forma
criptografada.
            {"\n\n"}
            1. Acesso aos dados: O usuário pode solicitar e obter informações
            sobre os dados que uma empresa possui sobre ele.
            {"\n\n"}
            2. Correção de dados: O usuário pode pedir a correção de dados
            incompletos, inexatos ou desatualizados.
            {"\n\n"}
            3. Anonimização, bloqueio ou eliminação: O usuário tem o direito de
            solicitar a anonimização, bloqueio ou eliminação de dados
            desnecessários, excessivos ou tratados em desconformidade com a
            LGPD.
            {"\n\n"}
            4. Portabilidade dos dados: O usuário pode solicitar a transferência
            dos seus dados pessoais a outro fornecedor de serviço ou produto.
            {"\n\n"}
            5. Eliminação dos dados pessoais tratados com o consentimento: O
            usuário pode pedir a eliminação dos dados pessoais tratados com base
            no seu consentimento, exceto em situações específicas previstas na
            lei.
            {"\n\n"}
            6. Informação sobre compartilhamento: O usuário tem direito a saber
            com quais entidades públicas e privadas os seus dados foram
            compartilhados.
            {"\n\n"}
            7. Informação sobre a possibilidade de não fornecer consentimento: O
            usuário deve ser informado sobre a possibilidade de não fornecer
            consentimento e sobre as consequências dessa negativa.
            {"\n\n"}
            8. Revogação do consentimento: O usuário pode revogar o
            consentimento dado para o tratamento dos dados pessoais a qualquer
            momento.
            {"\n\n"}
            <Text style={styles.sectionTitle}>
              • Transferência de Propriedade:
            </Text>
            {"\n\n"}
            Caso haja a troca de proprietário, atualização de tecnologia ou
            transição sujeita a mudanças drásticas na aplicação, as medidas de
            segurança serão mantidas, garantindo a integridade e a segurança dos
            dados.
            {"\n\n"}
          </Text>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  menuButton: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d1bafe",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  centeredView: {
    alignItems: "center",
    marginTop: 50,
  },
  centeredText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#c1ff72",
  },
  scrollContainer: {
    paddingHorizontal: 40, // Reduzido para melhorar o espaçamento flutuante
    paddingVertical: 20,   // Mais espaço vertical para dar um efeito "flutuante"
    flexGrow: 1,  // Faz o conteúdo ocupar o máximo possível
    justifyContent: "center", // Centraliza o conteúdo
  },
  textContent: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
    lineHeight: 24, // Linha mais espaçada para facilitar a leitura
    padding: 20, // Maior espaçamento interno do texto
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Fundo semitransparente para o efeito flutuante
    borderRadius: 10,  // Bordas arredondadas
    shadowColor: "#000",// Adiciona sombra para efeito de profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,// Sombra no Android
  },
  imageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  link: {
    color: '#9ce4fd', 
    textDecorationLine: 'underline', // Adiciona o sublinhado ao link
  },
});