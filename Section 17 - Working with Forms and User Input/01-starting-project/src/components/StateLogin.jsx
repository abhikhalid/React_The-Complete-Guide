// This file is the reference of Old Login.jsx file. 

import { useState } from "react";

export default function Login() {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    email:'',
    password:''
  });

  const emailIsValid =
    enteredValues.email.trim() !== '' &&
   !enteredValues.email.includes('@');


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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
           id="email" 
           type="email"
           name="email"
           onChange={(event) => handleInputChange('email',event.target.value)}
           value={enteredValues.email}
          />

          <div className="control-error">
            {emailIsValid && <p>Please enter a valid email address.</p>}
          </div>

        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
           id="password" 
           type="password" 
           name="password"
           onChange={(event) => handleInputChange('password',event.target.value)}
           value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
