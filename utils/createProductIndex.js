// createProductIndex.js
const elasticsearchClient = require('./elasticSearchClient');


const elasticsearchClient = require('./path_to_your_elasticsearch_client_file');

async function createProductIndex() {
  await elasticsearchClient.indices.create({
    index: 'products',
    body: {
      mappings: {
        properties: {
          title: { type: 'text' },
          price: { type: 'float' },
          description: { type: 'text' }
        }
      }
    }
  });
}


createProductIndex().catch(console.error);
