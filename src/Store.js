import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

function Store({loggedIn}) {
  const [fullName, setFullName] = useState("");
  const [numCartItems, setNumCartItems] = useState(0);

  useEffect(() => {
    setFullName(localStorage.getItem('fullname'));
    const id = localStorage.getItem('user-id');

    fetch(`https://fakestoreapi.com/carts/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setNumCartItems(data.products.length);
    });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('user-id');
    loggedIn();
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">
            Fake Store |
          </Typography>
          <IconButton color="inherit">
            Products
          </IconButton>
          <IconButton color="inherit">
            Categories
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        <h1>Store</h1>
        <h2>Welcome back {fullName}!</h2>
        <h3>Your Cart: {numCartItems} Item(s)</h3>
        <div>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
      <div>
        <h2>Products</h2>
        <h2>Categories</h2>
      </div>
    </div>
  );
}

export default Store;