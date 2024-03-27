// createIndex.js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const Product = require('../models/productModel');

// Check if the 'products' index exists
client.indices.exists({ index: 'products' }, function(err, resp, status) {
  if (err) {
    console.error(err);
  } else if (!resp) {
    // If the 'products' index does not exist, create it
    client.indices.create({ index: 'products' }, function(err, resp, status) {
      if (err) {
        console.error(err);
      } else {
        console.log('create', resp);
      }
    });
  }
});

// Fetch all products from the productModel
async function indexProducts() {
  try {
    const products = await Product.find({});
    // Index each product in Elasticsearch
    for (const product of products) {
      await client.index({
        index: 'products', 
        body: product 
      });
    }
    console.log('All products indexed');
  } catch (err) {
    console.error(err);
  }
}

indexProducts();