import { useState } from 'react';

function Login({loggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    fetch('https://fakestoreapi.com/auth/login', {
      method:'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if(res.status === 401 || res.status === 400) {
        setWrongLogin(true);
      } else {
        setWrongLogin(false);
        return res.json();
      }
    }).then(data => {
      console.log(data);
      localStorage.setItem('login-token', data.token);
      loggedIn(true);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>Fake Store</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <div>
        {wrongLogin && <h2>Incorrect Log-in information. Please try again.</h2>}
      </div>
    </div>  
  );
}

export default Login;