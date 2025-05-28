import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products/getAllProducts')
      .then((res) => {
        console.log("Fetched products:", res?.data);
        setProducts(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  if (!products || products.length === 0) return <p>No products available</p>;

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <img src={product.image ? `http://127.0.0.1:8000${product.image}` : logo} alt={product.name} style={styles.image} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <strong>${product.price} </strong>  
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    padding: '1rem',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    width: '200px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '0.5rem',
  },
};

export default ProductList;
