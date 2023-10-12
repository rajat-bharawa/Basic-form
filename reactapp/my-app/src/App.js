import './App.css';
import {useEffect, useState} from 'react';

function App() {

  const [form, setForm] = useState({});
  const [users, serUsers] = useState([]);

const handleForm=(e)=>{

  console.log(e.target.value,e.target.name);

  setForm({
    ...form,
    [e.target.name]:e.target.value
  })

}

const handleSubmit= async (e) =>{
  e.preventDefault();
 const response = await fetch('http://localhost:8080/newdemo', {
  method:"POST",
  body:JSON.stringify(form),
  headers:{
    "content-type":"application/json"
  }
  })
  const data = await response.json();
console.log(data);
}


const getUsers = async () =>{
 const response = await fetch('http://localhost:8080/newdemo', {
  method:"GET",
  })
  const data = await response.json();
serUsers(data);
}

useEffect(()=>{
  getUsers();
},[])

  return (
    <div class="main-div">
   <form onSubmit = {handleSubmit}>
    <span>Username</span><br/>
    <input type="text" name="username" onChange={handleForm} placeholder="Your Name..."/><br />
    <span>Email</span><br/>
    <input type="Email" name= "password" onChange={handleForm} placeholder="Your Email..."/><br/>
    <input class="sub-btn" type="submit"/>
   </form>
   <div>
    <ul>
      {users.map(user=><li key={user._id}>Username:- {user.username}<br/>Password:- {user.password}</li>)}
    </ul>
   </div>
   </div>
  );
}

export default App;
