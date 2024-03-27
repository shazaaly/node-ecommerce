// // Assuming elasticSearchClient.js exports a properly configured Elasticsearch client
// const elasticsearchClient = require('./elasticSearchClient');
// const { getAllProducts } = require('../controllers/productController');

// async function indexProductsInElasticsearch() {
//   try {
//     const products = await getAllProducts(); // Ensure this returns an array of all products
//     for (const product of products) {
//       await elasticsearchClient.index({
//         index: 'products',
//         id: product._id.toString(), // Convert MongoDB _id to string
//         document: product, // For newer versions of Elasticsearch client use `document`
//       }).catch(err => console.error(`Failed to index product ${product._id}:`, err));
//     }
//     await elasticsearchClient.indices.refresh({ index: 'products' });
//     console.log('Successfully indexed all products.');
//   } catch (error) {
//     console.error('Error indexing products:', error);
//   }
// }

// indexProductsInElasticsearch();
