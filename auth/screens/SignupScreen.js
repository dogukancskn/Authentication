import { Alert, StyleSheet, Text, View } from 'react-native';
import React,{useState,useContext} from 'react';
import AuthContent from '../components/AuthContent';
import { createUser } from '../util/auth';
import Loading from '../components/Loading';
import { AuthContext } from '../store/auth-context';



export default function SignupScreen() {

  const authContext = useContext(AuthContext)

  const [isAuthanticating, setIsAuthanticating] = useState(false)

  async function singUpHandler({ email, password }) {
    setIsAuthanticating(true)
    try{
    const token =   await createUser(email, password)
    authContext.authenticate(token)
    }catch(error){
      Alert.alert('Kayıt Başarız!','Bilgilerinizi Kontrol Edin')
    }
    
    setIsAuthanticating(false)
  }

  if(isAuthanticating){
    return <Loading message='Kullanıcı Oluşturuluyor...'></Loading>
  }

  return (
    <AuthContent onAuthenticate={singUpHandler}></AuthContent>
  );
}

const styles = StyleSheet.create({});
