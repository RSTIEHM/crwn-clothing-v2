import { useEffect } from 'react';
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
  auth,
  signInWithGooglePopup, 
  signInWithGoogleRedirect, 
  createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'


const SignIn = () => {

  useEffect(() => {
    const fetchResponse = async() => {
      const response = await getRedirectResult(auth)
      if(response) {
        const userDocRef =  await createUserDocumentFromAuth(response.user)
        console.log(userDocRef)
      }
    }
    fetchResponse()
  }, [])


  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={() => logGoogleUser()}>Sign in with Google Popup</button>
      <button onClick={() => signInWithGoogleRedirect()}>Sign in with Google Redirect</button>
      <SignUpForm />
      
    </div>
  );
};

export default SignIn;