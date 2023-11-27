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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "./Store.css";

function Store({loggedIn}) {
  const [fullName, setFullName] = useState("");
  const [numCartItems, setNumCartItems] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [chooseCategory, setChooseCategory] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  useEffect(() => {
    setFullName(localStorage.getItem('fullname'));
    const id = localStorage.getItem('user-id');
    let totalCartItems = 0;

    fetch(`https://fakestoreapi.com/carts/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCart(data);
      data.products.forEach(item => {
        totalCartItems += item.quantity;
      })
      setNumCartItems(totalCartItems);
    });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('user-id');
    setShowAllProducts(false);
    setShowCategories(false);
    setChooseCategory(false);
    setShowCart(false);
    loggedIn();
  }

  const handleAllProducts = () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setAllProducts(data);
      setShowAllProducts(true);
      setShowCategories(false);
      setChooseCategory(false);
      setShowCart(false);
    });
  }

  const handleCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCategories(data);
      setShowCategories(true);
      setShowAllProducts(false);
      setChooseCategory(false);
      setShowCart(false);
    });
  }

  const displayCat = (cat) => {
    fetch(`https://fakestoreapi.com/products/category/${cat}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCatProducts(data);
      setSelectedCategory(cat);
      setChooseCategory(true);
      setShowCategories(false);
      setShowAllProducts(false);
      setShowCart(false);
    });
  }

  const handleCart = () => {
    let promises = [];
    cart.products.forEach(product => {
      promises.push(fetch(`https://fakestoreapi.com/products/${product.productId}`).then(res => res.json()));
    });
    Promise.all(promises)
    .then(r => {
      console.log(r);
      for(let i = 0; i < cart.products.length; i++) {
        r[i].quantity = cart.products[i].quantity;
      }
      setCartProducts(r);
      setShowCart(true);
      setChooseCategory(false);
      setShowCategories(false);
      setShowAllProducts(false);
    });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={handleAllProducts} color="inherit">
            Products
          </Button>
          <Button onClick={handleCategories} color="inherit">
            Categories
          </Button>
          <div style={{marginLeft: "auto"}}>
            <Typography className="fullName" variant="h6">
              Welcome back {fullName}!
            </Typography>
            <IconButton onClick={handleCart}>
              <Badge badgeContent={numCartItems} color="secondary">
                <ShoppingCartIcon sx={{color: "white"}} fontSize="large" />
              </Badge>
            </IconButton>
            <Button style={{marginLeft: "11px"}} onClick={handleLogOut} color="inherit" variant="outlined">
              Log Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {showAllProducts && 
          <div>
            <h1>All Products - {allProducts.length} products</h1>
            <Grid container spacing={2}>
              {allProducts.map((product, i) => 
                <Grid item key={i} lg={4}>
                  <Product prod={product} />
                </Grid>
              )}
            </Grid>
          </div>
        }
        {showCategories &&
          <div>
            <h1>All Categories - {categories.length} categories</h1>
            <List>
              {categories.map((cat, i) =>
                <ListItem key={i}>
                  <ListItemButton onClick={() => displayCat(cat)}>
                    <ListItemText primary={cat.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} />
                  </ListItemButton>
                </ListItem>  
              )}
            </List>
          </div>
        }
        {chooseCategory &&
          <div>
            <h1>{selectedCategory.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} - {catProducts.length} products</h1>
            <Grid container spacing={2}>
              {catProducts.map((product, i) => 
                <Grid item key={i} lg={4}>
                  <Product prod={product} />
                </Grid>
              )}
            </Grid>
          </div>
        }
        {showCart &&
          <div>
            <h1>Your Cart - {numCartItems} items</h1>
            <List>
              {cartProducts.map((prod, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar src={prod.image} />
                  </ListItemAvatar>
                  <ListItemText primary={prod.title} secondary={"Quantity: " + prod.quantity} />
                </ListItem>
              )}
            </List>
          </div>
        }
      </Container>
    </div>
  );
}

export default Store;