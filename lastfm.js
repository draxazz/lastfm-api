const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { user, apiKey } = req.query;
  if (!user || !apiKey) {
    return res.status(400).json({ error: 'Missing user or apiKey' });
  }
  const apiURL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching from Last.fm' });
  }
};
