import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Buton from './Buton'

export default function AuthForm({ isLogin,onsubmit,credentialsInValid }) {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('')
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')

    const { 
        email:emailIsValid,
        confirmEmail:emailsDontMatch,
        password:passwordIsValid,
        confirmPassword:passwordDontMatch
    } = credentialsInValid

    function submitHandler(){
        onsubmit({
            email:enteredEmail,
            confirmEmail:enteredConfirmEmail,
            password:enteredPassword,
            confirmPassword:enteredConfirmPassword
        })
    }
    
    function updateInput(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue)
                break
            case 'password':
                setEnteredPassword(enteredValue)
                break
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue)
                break
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue)
                break
        }
    }

    return (
        <View>
            <Input
                label='Email'
                keyboardType='email-address'
                onUpdateValue={updateInput.bind(this, 'email')}
                value={enteredEmail}
                isInValid={emailIsValid}
            ></Input>

            {!isLogin && (
                <Input
                    label='Emaili Doğrula'
                    keyboardType='email-address'
                    onUpdateValue={updateInput.bind(this, 'confirmEmail')}
                    value={enteredConfirmEmail}
                    isInValid={emailsDontMatch}
                ></Input>
            )}

            <Input
                label='Şifre'
                secure
                onUpdateValue={updateInput.bind(this, 'password')}
                value={enteredPassword}
                isInValid={passwordIsValid}
            ></Input>

            {!isLogin && (
                <Input
                    label='Şifreyi Doğrula'
                    secure
                    onUpdateValue={updateInput.bind(this, 'confirmPassword')}
                    value={enteredConfirmPassword}
                    isInValid={passwordDontMatch}
                ></Input>
            )}
            <View>
                <Buton style={styles.buttons} onPress={submitHandler}>
                    {isLogin ? 'Giriş Yap' : 'Kaydol'}
                </Buton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 10,
    },
})