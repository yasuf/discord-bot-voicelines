const axios = require('axios');

const client = axios.create({
  baseURL: 'https://lines-api.herokuapp.com/api',
  headers: {
    'Authorization': `Bearer ${process.env.LINES_API_TOKEN}`
  }
});

const getLines = () => {
  return client.get('/lines');
}

module.exports = {
  client,
  getLines
};
