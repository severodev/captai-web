const express = require('express');

const app = express();

app.use(express.static('./dist/captia-web'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/captia-web/'}),
);

app.listen(process.env.PORT || 8080);
