import express from 'express';
import data from './data.js';
const app = express();

app.get('/products', function(req, res){
    res.send(data);
});

app.get('/product/:id', function(req, res){
    const foundItem = data.products.find(product => product._id === req.params.id);
        res.send(foundItem);
});

app.get('/', function(req, res){
    res.send('Root position');
});

app.listen('4000',()=> console.log('Server is active on http://localhost:4000'));