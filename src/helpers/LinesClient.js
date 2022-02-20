const axios = require('axios');

const client = axios.create({
  baseURL: `${process.env.LINES_API_URL}/api`,
  headers: {
    'Authorization': `Bearer ${process.env.LINES_API_TOKEN}`
  }
});

const getLines = () => {
  return client.get('/lines');
}

const getLineByName = (name) => {
  return client.get(`/lines/search?query=${name}`);
}

module.exports = {
  client,
  getLines,
  getLineByName,
};
