const express = require('express');
const { withAuthentication, ContextHolder } = require('@frontegg/client');

const app = express();

ContextHolder.setContext({
    FRONTEGG_CLIENT_ID: '<YOUR_CLIENT_ID>',
    FRONTEGG_API_KEY: '<YOUR_API_KEY>',
});


app.get('/public', (req, res) => {
    res.status(200).send('Got to public route!');
});

// We are protecting ALL routes from this point and require them to be authenticated
app.use(withAuthentication());

app.use('/private', (req, res) => {
    res.status(200).send('You got to private route!');
});

// Protect all /admin URLS with a role guard
app.use('/admin', withAuthentication({ roles: ['admin']}));

app.get('/admin', (req, res) => {
    res.status(200).send();
})

app.post('/upload', withAuthentication({ permissions: ['file.upload']}), (req, res) => {
    res.status(200).send('uploaded file');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
