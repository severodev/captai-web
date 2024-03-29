const express = require('express');

const app = express();

app.use(express.static('./dist/captai-web'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/captai-web/'}),
);

app.listen(process.env.PORT || 8080);
