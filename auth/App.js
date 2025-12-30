import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AuthContentProvider, { AuthContext } from './store/auth-context';
import HomeScreen from './screens/HomeScreen';
import { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

function NormalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blueviolet',
        },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: 'white' }
      }}>
      <Stack.Screen name="Login" component={LoginScreen}
        options={{
          headerTitle: 'Kullanıcı Girişi'
        }}
      />
      <Stack.Screen name="Signup" component={SignupScreen}
        options={{
          headerTitle: 'Kullanıcı Kayıt'
        }} />
    </Stack.Navigator>
  );
}


function AfterAuthenticatedStack() {
  const authContext = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blueviolet',
        },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: 'white' }
      }}>
      <Stack.Screen 
      name="Home" 
      component={HomeScreen}
        options={{
          headerTitle: 'Anasayfa',
          headerRight:({tintColor})=>(
            <Pressable 
            onPress={authContext.logout}
            style={({pressed})=>pressed && styles.pressed}>
             <Ionicons name="exit" size={24} color={tintColor}/>
            </Pressable>
          )
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation(){
  const authContext = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authContext.isAuthenticate && <NormalStack />}
      {authContext.isAuthenticate && <AfterAuthenticatedStack />}
  </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthContentProvider>
     <Navigation></Navigation>
    </AuthContentProvider>

  );
}

const styles = StyleSheet.create({
  pressed:{
    opacity:0.5
  }
});
