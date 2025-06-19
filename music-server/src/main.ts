import { spawn }  from 'child_process';
import express from 'express';
import { parseFile } from 'music-metadata';

const app: express.Application = express();
const port: number = 3000;
const appRoot: string = '/wetwayne-music-server';
interface metadataResponseBodyInterface {
    cover: string,
    artist: string,
    title: string,
    album: string,
    trackNumber: number
}

app.get(`${appRoot}/song/:songId`, (req, res) => {
  console.log('received');
  /*const ls = spawn('metaflac', ['--show-tag=artist', '/home/noah/Music/Anamanaguchi/00 - Anamanaguchi - Miku feat. Hatsune Miku.flac']);
  ls.stdout.on('data', (data) => {
    console.log(`${data}`);
  })
    */
  res.sendFile('/home/noah/Music/Anamanaguchi/00 - Anamanaguchi - Miku feat. Hatsune Miku.flac');
});

app.get(`${appRoot}/metadata/:songId`, async (req, res) => {
  console.log('received');

  const musicMetadata = await parseFile('/home/noah/Music/Camellia/00 - かめりあ(Camellia) - Nacreous Snowmelt (for THX 70k Twitter Followers).flac');
  const picture = musicMetadata.common.picture?[0] : '';
  res.send(picture.data)
});

app.listen(port, () => {
  console.log(`TypeScript with Express 
    http://localhost:${port}${appRoot}/`);
});

