import firebase from 'firebase/compat/app';
import { auth } from '../config/firebase';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        return auth.signInWithPopup(provider)
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}
