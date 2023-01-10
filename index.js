const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', async (req, res) => {
  try {
    const response = {
      availableMethods: [
        {
          "description": "Get the list of available APIs",
          "apiURL": "/"
        },
        {
          "description": "Get the list of Github repos by providing username",
          "apiURL": "/getrepos"
        }
      ]
    };

    res.send(response);
  } catch (error) {
    res.status(400).send('Error while getting list of APIs');
  }
});

app.get('/getrepos', async (req, res) => {
  const username = req.query.username || 'nitank';
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.send(repos);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});