import './sign-up-form.styles.scss'

import { useState } from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormFields({...formFields, [name]: value})
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const handleSubmit = async(e) => {
    e.preventDefault() 
    if( password !== confirmPassword) {
      return
    }

    if(displayName === '' || email === '' || password === '' || confirmPassword === '') {
      return
    }


    try {
      let {user} = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
 
    } catch(e) {
      if(e.code === 'auth/email-already-in-use') {
        alert('EMIAL IN USE')
      } else {
        console.log('ERROR: ', e)
      }

    }

  }

  return (
  
    <div>
      <h1>Sign Up With Eail And Password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Display Name" 
          value={displayName} 
          required 
          type="text" 
          onChange={handleChange} 
          name="displayName"/>
        <FormInput 
          label="Email" 
          value={email} 
          required 
          type="email" 
          onChange={handleChange} 
          name="email"/>
        <FormInput 
          label="Password" 
          value={password} 
          required 
          type="password" 
          onChange={handleChange} 
          name="password"/>
        <FormInput 
          label="Confirm Password" 
          value={confirmPassword} 
          required 
          type="password" 
          onChange={handleChange} 
          name="confirmPassword"/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm