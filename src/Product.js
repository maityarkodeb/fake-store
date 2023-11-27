import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import './Product.css';

function Product({prod}) {
  return (
    <Card style={{textAlign: "center"}}>
      <h2>{prod.title}</h2>
      <h2 style={{color: "green"}}>{prod.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h2>
      <Rating name="product-rating" defaultValue={prod.rating.rate} precision={0.5} readOnly />
      <span className="reviews">{prod.rating.rate} out of {prod.rating.count} reviews</span>
      <h3><i>{prod.category.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</i></h3>
      <img alt="" height="300" width="300" src={prod.image} />
      <p>{prod.description}</p>
    </Card>
  );
}

export default Product;