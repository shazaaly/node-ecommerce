//elastic search
const Product = require('')
const elasticsearch = require('elasticsearch');
const elasticsearchClient = new elasticsearch.Client({
  host: 'localhost:9200'
});

module.exports = elasticsearchClient;