import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Cadastro } from "../../cadastro";
import { Login } from "../../login";
import { InitialScreen } from "../../initialScreen";
import { TermosDeUso } from "../../TermosDeUso";
import CadastroSuccess from "../../CadastroSuccess"; 
import HistoricoResponsaveis from "../../HistoricoResponsaveis";
import EditarUsuarioScreen from "../../EditarUsuarioScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="InitialScreen">
      <Drawer.Screen name="Ínicio" component={InitialScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Drawer.Screen name="Termos de Uso" component={TermosDeUso} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerRoutes} />
        <Stack.Screen name="CadastroSuccess" component={CadastroSuccess} />
        <Stack.Screen name="HistoricoResponsaveis" component={HistoricoResponsaveis} /> 
        <Stack.Screen name="EditarUsuarioScreen" component={EditarUsuarioScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
