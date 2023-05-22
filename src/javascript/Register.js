import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate, useResolvedPath } from "react-router-dom";

async function signupUser(credentials) {
  return fetch("http://localhost:8000/fetch-add-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export default function Register({ setToken, setSavedUserName }) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();
  const [badPassword, setBadPassword] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badUsername, setBadUsername] = useState(false);

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.state);

  //pipeline
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password!==passwordAgain){
        setBadPassword(true)
        return
    }
    setBadPassword(false)
    const result = await signupUser({
      "username":username,
      "email":email,
      "password": password,
    }).then((data) => data.json());
    if (result["token"]==="403"){
      setBadEmail(true)
    }
    else if(result["token"]==="400"){
      setBadUsername(true)
    }
    else{
      navigate("/home")
    }


  };

  const badPasswordElement =  <div className="passwords-no-match">Passwords do not match!</div>
  const badEmailElement =  <div className="email-exists">Email already in use!</div>
  const badUserElement =  <div className="user-exists">Username already exists!</div>
  return (
    <div className="login-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            minlength="8" maxlength="64"
          />
        </label>
        <label>
          <p>Password again</p>
          <input
            type="password"
            onChange={(e) => setPasswordAgain(e.target.value)}
            minlength="8" maxlength="64"
          />
        </label> 
        {badPassword && badPasswordElement} 
        {badEmail && badEmailElement}
        {badUsername && badUserElement}
        <div>
          <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};
