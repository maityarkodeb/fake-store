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
      loggedIn();
    }).catch(error => {
      console.log(error);
    });

    fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(user => {
        if (user.username === username) {
          localStorage.setItem('fullname', `${user.name.firstname.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} 
            ${user.name.lastname.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`);
          localStorage.setItem('user-id', user.id);
        }
      });
    });
  }

  return (
    <div>
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