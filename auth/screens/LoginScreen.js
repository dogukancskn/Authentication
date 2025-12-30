import { Alert, StyleSheet, Text, View } from 'react-native';
import React,{useContext, useState} from 'react';
import AuthContent from '../components/AuthContent';
import Loading from '../components/Loading';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

export default function LoginScreen() {

  const authContext = useContext(AuthContext)

  const [isAuthanticating, setIsAuthanticating] = useState(false)
  
    async function loginHandler({ email, password }) {
      setIsAuthanticating(true)
      try {
      const token = await login(email, password)
        authContext.authenticate(token)
      } catch (error) {
        Alert.alert('Giriş Başarısız','Bilgilerinizi Kontrol Edin')
      }
      
      setIsAuthanticating(false)
    }
  
    if(isAuthanticating){
      return <Loading message='Kullanıcı Girişi Yapılıyor...'></Loading>
    }

  return (
    
    <AuthContent 
    isLogin={true} 
    onAuthenticate={loginHandler}></AuthContent>
  );
}

const styles = StyleSheet.create({});
