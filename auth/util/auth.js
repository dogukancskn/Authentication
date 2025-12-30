import axios from "axios"

const API_KEY = 'AIzaSyD4CIlM-CA09wT3YAEk7GcUBXn1FJdNDDk'

async function authanticate(mode,email,password){
    const response = await axios.post(
        `
        https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}
        `,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
    )
    const token  = response.data.idToken;
    return  token;
    
}

export function createUser(email,password){

    return authanticate('signUp',email,password)
   
}

export function login(email,password){

    return authanticate('signInWithPassword',email,password)
   
}