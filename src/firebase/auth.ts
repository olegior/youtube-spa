import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthPageUserType } from "../types";
import { firebaseAuth } from "."

type AuthFunctionType = typeof signInWithEmailAndPassword | typeof createUserWithEmailAndPassword;

const auth = async ({ email, password }: AuthPageUserType, authFunction: AuthFunctionType) => {
    try {
        const {user} = await authFunction(firebaseAuth, email, password);              
        return user
    }
    catch (err) {
        if (err instanceof Error)
            return err.message;
    }
}

export const signIn = (data: AuthPageUserType) => {
    return auth(data, signInWithEmailAndPassword)
}

export const signUp = (data: AuthPageUserType) => {
    return auth(data, createUserWithEmailAndPassword)
}


