// This file is the reference of Old Login.jsx file. 

import { useState } from "react";
import Input from "./Input";
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation';

export default function Login() {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    email:'',
    password:''
  });


  //user interact with them but they did lost focus 
  const [didEdit, setDidEdit] = useState({
    email:false,
    password:false
  });

  const emailIsValid =
    didEdit.email &&
   !isEmail(enteredValues.email) &&
   !isNotEmpty(enteredValues.email)
   ;

   const passwordIsValid = 
    didEdit.password &&
    !hasMinLength(enteredValues.password, 6);


  const handleSubmit = (event) => {
      event.preventDefault();

      // console.log(`User email: ${enteredEmail}`);
      console.log('User email: ', enteredValues.email);
      console.log('User password: ', enteredValues.password);
  }

  function handleInputChange(identifier, value){
    setEnteredValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: value
      }
    });

    setDidEdit(prevEdit => {
      return {
        ...prevEdit,
        [identifier]: false
      }
    })
  }

  function handleInputBlur(identifier){
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }))
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email" 
          onBlur={() =>handleInputBlur('email')}
          onChange={(event) => handleInputChange('email',event.target.value)}
          value={enteredValues.email}
          error={emailIsValid && 'Please enter a valid email!'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          onChange={(event) => handleInputChange('password',event.target.value)}
          onBlur={() =>handleInputBlur('password')}
          value={enteredValues.password}
          error={passwordIsValid && 'Please enter a valid password!'}
        />
       
       </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
