import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '100%',
    },
    navText: {
        fontSize: 18,
        textAlign: 'center',
        flex: 1,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 3,
    },
    logoContainer: {
        marginLeft: 'auto',
        marginRight: 2,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: -16,
    },
    menuButton: {
        marginRight: 10,
    },
    image: {
        width: 200,
        height: 400,
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 45,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    title1: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#0e194d",
    },
    highlight: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#9CE4FD',
    },
    description: {
        fontSize: 18,
        color: '#545454',
        textAlign: 'center',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#FB9ED7',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 85,
        width: 150,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
      
});
