// searchController.js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

exports.searchProducts = async (req, res) => {
  const { query } = req.body;
  console.log(req.body);

  try {
    const resp = await client.search({
      index: 'products',
      body: {
        query: {
          match: { name: query }
        }
      }
    });
    console.log(res.body);
    // Check if resp.body and resp.body.hits exist before trying to access resp.body.hits.hits
    if (res.body && res.body.hits) {
      res.status(200).json(res.body.hits.hits);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};