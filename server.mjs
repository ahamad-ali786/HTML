import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const server = createServer(async (req, res) => {
  try {
    if (req.url === '/' || req.url === '/audio.html') {
      // Serve the HTML file
      const htmlPath = resolve(__dirname, 'audio.html');
      const htmlContent = await readFile(htmlPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlContent);
    } else if (req.url === '/rooba rooba.ogg') {
      // Serve the audio file
      const audioPath = resolve(__dirname, 'rooba rooba.ogg');
      res.writeHead(200, { 'Content-Type': 'audio/ogg' });
      const audioStream = createReadStream(audioPath);
      audioStream.pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found\n');
    }
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error\n');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000');
});
