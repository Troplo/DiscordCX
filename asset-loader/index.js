import express from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import 'dotenv/config'

const __dirname = path.resolve();

// 20250201 & 20250826 are patched to allow soundpacks.
const ALLOWED_VERSIONS = ['20160623', '20170330', '20181016', '20190725', '20200514', '20230901', '20240711', '20250201', '20250826'];

// https://www.kaverti.com/e/en/internal-services/ports
const PORT = 24034;
const app = express();

app.get('/assets/:assetId.:ext', (req, res) => {
  if(req.headers['x-troplo-at'] !== process.env.STREAMER_ACCESS_TOKEN && req.query.at !== process.env.STREAMER_ACCESS_TOKEN) {
    return res.status(404).send('Asset not found (Code 0)');
  }
  if(req.params.assetId.includes('..')) {
    return res.sendStatus(404);
  }

  // The subdomain is used to determine the version, such as 20240711.dev.chatx.troplo.com
  const version = req.headers['x-troplo-discord-version'] || req.query.v;
  if(version?.length !== 8 || isNaN(Number(version)) || !ALLOWED_VERSIONS.includes(version)) {
    return res.status(404).send('Asset not found (Code 1)');
  }

  console.log(`Request for asset ${req.params.assetId}.${req.params.ext} for version ${version}`);
  const assetPath = path.join(__dirname, '..', version, 'assets', `${req.params.assetId}.${req.params.ext}`);

  if(fs.existsSync(assetPath)) {
    return res.sendFile(assetPath);
  } else {
    axios.get(`https://canary.discord.com/assets/${req.params.assetId}.${req.params.ext}`, { responseType: 'arraybuffer' })
      .then(response => {
        console.log(`Fetched asset ${req.params.assetId}.${req.params.ext} and saved.`);
        fs.writeFileSync(assetPath, response.data);
        res.set('Content-Type', response.headers['content-type']);
        return res.send(response.data);
      })
      .catch(() => {
        console.log(`Asset ${req.params.assetId}.${req.params.ext} not found.`);
        return res.status(404).send('Asset not found (Code 2)');
      });
  }
});

app.get(/.*/, (req, res) => {
  if(req.headers['x-troplo-at'] !== process.env.STREAMER_ACCESS_TOKEN && req.query.at !== process.env.STREAMER_ACCESS_TOKEN) {
    return res.status(404).send('Asset not found (Code 0)');
  }

  const version = req.headers['x-troplo-discord-version'] || req.query.v;
  if(version?.length !== 8 || isNaN(Number(version)) || !ALLOWED_VERSIONS.includes(version)) {
    return res.status(404).send('Asset not found (Code 1)');
  }

  const assetPath = path.join(__dirname, '..', version, 'index.html');

  res.sendFile(assetPath);
});

app.listen(PORT, () => {
  console.log(`Asset loader running on port ${PORT}`);
});

