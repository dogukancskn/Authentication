import { createContext, useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext({
    token: '',
    isAuthenticate: false,
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContentProvider({ children }) {

    const [authToken, setAuthToken] = useState(null)

    useEffect(() => {

        async function fetchToken() {
            const storedToken = await AsyncStorage.getItem('token')

            if(storedToken){
                setAuthToken(setAuthToken)
            }
        }
        fetchToken()
    }, [])

    function authenticate(token) {
        setAuthToken(token)
        AsyncStorage.setItem('token', token)
    }
    function logout(token) {
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContentProvider;