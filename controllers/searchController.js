const elasticsearchClient = require('../utils/elasticSearchClient');

exports.searchProducts = async (req, res) => {
  const { query } = req.query; // Assuming you pass the search term as a query parameter

  try {
    const { body } = await elasticsearchClient.search({
      index: 'products',
      body: {
        query: {
          multi_match: { // or use `match` for specific fields
            query: query,
            fields: ['title', 'description', 'brand'], // Adjust fields according to what you want to search
          }
        }
      }
    });

    // Extracting the hits
    const results = body.hits.hits.map(hit => hit._source);

    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error executing search' });
  }
};
