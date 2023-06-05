import React, {useState , useEffect} from 'react'
import axios from 'axios';
import Header from './Header'
import Card from './card'
const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        const fetchData = async() => {
        const incomingData = await axios.get('/products');
        setProducts(incomingData.data.products);
        }
        fetchData();
    }, []);
  return (
    <div className='container-fluid'>
    <Header />
    <br /><br /><br />
    <h1>Featured Products</h1>
    <div className='row'>
    {products.map((item) => <Card key={item._id} id={item._id} obj={item}/>)}
    </div>
    
  </div>
  )
}

export default HomeScreen