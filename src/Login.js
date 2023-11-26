import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

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
    <Container maxWidth="sm">
      <h1 style={{textAlign: "center"}}>Fake Store</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField 
            id="username" 
            name="username"
            label="Username" 
            variant="outlined"
            size="small"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">Log In</Button>
        </Stack>
      </form>
      <br />
      <div>
        {wrongLogin && <Alert severity="error"><AlertTitle>Incorrect Log-in Information</AlertTitle>Please try again.</Alert>}
      </div>
    </Container>
  );
}

export default Login;