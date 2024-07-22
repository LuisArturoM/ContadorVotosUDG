import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './screens/Inicio';
import Votador from './screens/Votador';
import Contador from './screens/Contador';
import Login from './screens/Login';
import ModalRegister from './src/components/ModalRegister';
import ModalLogin from './src/components/ModalLogin';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="ModalLogin" component={ModalLogin} options={{headerShown: false}}/>
          <Stack.Screen name="Inicio" component={Inicio} options={{headerShown: false}}/>
          <Stack.Screen name="Votador" component={Votador} options={{headerShown: false}}/>
          <Stack.Screen name="Contador" component={Contador} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 