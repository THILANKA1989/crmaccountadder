import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  
  const [IsValid,setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    name: '', firstname: '', lastname: '', email: '' 
  });
  const emailRegex = /\S+@\S+\.\S+/;

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage('');
    } else {
      setIsValid(false);
      setMessage('Please enter a valid email!');
    }
  };

  const handleSubmit = (event) => {
    values.name = values.firstname;
    fetch("https://dynamicsfunctions365.azurewebsites.net/api/DCRMAddContacts?code=cq4n1oI0Ii0dYWztgsxcsQtQatmsRY7aodV0UUqQHBvKDuHFR6dsHw==", {
      method: "POST",
      headers: {"Content-Type": "text/plain; charset=utf-8","Request-Context": "appId=cid-v1:73a4c7ee-a440-46d7-a2b9-63ba87e152f2"},
      body: JSON.stringify(values),
    })
      .then(response => {
        console.log(JSON.stringify(response));
        document.getElementById("account-form").reset();
        document.getElementById("success").style.display = "block";
        document.getElementById("addAccountForm").style.display = "none";
      })
      .catch(error => {
        console.log(error);
        document.getElementById("failure").style.display = "block";
      })
  }

  return (
    <div className="wrapper">
      <h2>Add an Account in your CRM Environment</h2>
      <div className="row">
        <div className="row" id="success">
          <div className="col-md-12">
            <h3 className="color-green alert">Account added to queue successfully!</h3>
          </div>
        </div>
        <div className="row" id="failure"></div>
        <div className="col-md-12" id="addAccountForm">
          <form id="account-form">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" id="firstname" placeholder="First Name" value={values.firstname} onChange={set('firstname')} />
            </div>
            <div className="form-group">
              <label className="form-check-label">Last Name</label>
              <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={values.lastname} onChange={set('lastname') }/>
            </div>
            <div className="form-group">
              <label>Email Address</label><br/>
              <small className="text-error">{message}</small>
              <input className="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={validateEmail} placeholder="Enter email"  value={values.email} onChange={set('email') } />
            </div>
            <button onClick={handleSubmit} type="button" className="btn btn-primary btn-submit" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
