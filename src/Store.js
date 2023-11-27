import { useState, useEffect } from 'react';
import Product from './Product';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "./Store.css";

function Store({loggedIn}) {
  const [fullName, setFullName] = useState("");
  const [numCartItems, setNumCartItems] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

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
    showAllProducts(false);
    loggedIn();
  }

  const handleAllProducts = () => {
    setShowAllProducts(true);
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setAllProducts(data);
    });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={handleAllProducts} color="inherit">
            Products
          </Button>
          <Button color="inherit">
            Categories
          </Button>
          <div style={{marginLeft: "auto"}}>
            <Typography className="fullName" variant="h6">
              Welcome back {fullName}!
            </Typography>
            <IconButton>
              <Badge badgeContent={numCartItems} color="secondary">
                <ShoppingCartIcon sx={{color: "white"}} fontSize="large" />
              </Badge>
            </IconButton>
            <Button style={{marginLeft: "8px"}} onClick={handleLogOut} color="inherit" variant="outlined">
              Log Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        {showAllProducts && 
          <Container maxWidth="lg">
            <h1>All Products - {allProducts.length} out of {allProducts.length}</h1>
            <Grid container spacing={2}>
              {allProducts.map((product, i) => 
                <Grid item key={i} lg={4}>
                  <Product prod={product} />
                </Grid>
              )}
            </Grid>
          </Container>
        }
      </div>
    </div>
  );
}

export default Store;