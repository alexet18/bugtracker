import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Link, Redirect,useHistory } from 'react-router-dom';
import axios from 'axios';



var username,password;

function LoginPage() {

  return (
<div className = "login-vertical">
<div className = "login-div">
  <label>
    Name:
  </label>
  <input type="text" name="name" id="name" />
  </div>
  <div className = "password-div">
   <label>
     Password:
   </label>
   <input type="password" name="password" id="pass"/>
   </div>
   <div className = "buttons">
  <input id = "login" type="button" value="Login" onClick={

function click(){

    username=document.getElementById("name").value;
    password = document.getElementById("pass").value;


    localStorage.setItem("username",username);
    localStorage.setItem("password",password);

    
    

   fetch('http://localhost:8000/api/login/'+username+'/'+password)
   .then(response=>response.json())
   .then(data=>{
     if(data.length > 0)
    {
              fetch('http://localhost:8000/api/getMemberByName/'+username).then(response=>response.json())
              .then(data=>{ localStorage.setItem("id",data[0].Id)}).then(()=>{
                window.location.href = 'http://localhost:3000/projects';
              });
                     
       
    }
     else
     {
       alert("Date invalide!");
     }
   });



   
}

  }/>
  <input id = "register" type="button" value="Register" onClick={
    ()=>{
      if(document.getElementById("name").value.length < 3 || document.getElementById("pass").value.length < 3)
      {
        alert("emailul si parola trebuie sa aiba minim 3 caractere")
      }
      else
      {
      axios.post('http://localhost:8000/api/addMember',{
        Email: document.getElementById("name").value,
        Password: document.getElementById("pass").value
      }).then(()=>{
        alert("User inregistrat!");
      })
      }
    }
  } />
  </div>
</div>




)

}





export default LoginPage;

