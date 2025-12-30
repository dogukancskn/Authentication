import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import AuthForm from './AuthForm'
import ButtonWhite from './ButtonWhite'
import { useNavigation } from '@react-navigation/native'

export default function AuthContent({isLogin,onAuthenticate}) {
    const navigation = useNavigation()
    const [credentialsInValid, setCredentialsInValid] = useState({
        email:false,
        password:false,
        confirmEmail:false,
        confirmPassword:false
    })

    function submitHandler(credentials){
        let {confirmEmail,confirmPassword,email,password} = credentials

        email=email.trim();
        password=password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if(
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
          ) 
          {
            Alert.alert('Hops!', 'Lütfen girdiğniz değerleri kontrol ediniz!');
            setCredentialsInValid({
              email: !emailIsValid,
              confirmEmail: !emailIsValid || !emailsAreEqual,
              password: !passwordIsValid,
              confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
            }
            onAuthenticate({email,password})
    }

    function switchSreen(){
        if(isLogin){
            navigation.navigate('Signup')
        }
        else{
            navigation.navigate('Login')
        }
    }

  return (
    <View style={styles.container}>
      <AuthForm 
      credentialsInValid={credentialsInValid}  
      isLogin={isLogin} 
      onsubmit={submitHandler}></AuthForm>
      <View>
        <ButtonWhite onPress={switchSreen}>
            {isLogin ? 'Yeni kulanıcı oluştur' : 'Giriş yap'}
        </ButtonWhite>
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blueviolet',
        marginTop: 50,
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
})