# Getting Started with Frontegg Node.JS authentication middleware

This sample provides samples on how to protect your Node.JS application with Frontegg authentication middleware.

### Importing the Frontegg Node.JS withAuthentication middleware
```javascript
const { withAuthentication, ContextHolder } = require('@frontegg/client');
```

### Setting your clientId and apiKey on the context holder
```javascript
ContextHolder.setContext({
    FRONTEGG_CLIENT_ID: '<YOUR_CLIENT_ID>',
    FRONTEGG_API_KEY: '<YOUR_API_KEY>',
});
```

### Making all routes to be protected with authentication
```javascript
// We are protecting ALL routes from this point and require them to be authenticated
app.use(withAuthentication());
```

### Authorizing routes by role
```javascript
app.use('/admin', withAuthentication({ roles: ['admin']}));
```
### Authorizing routes by permission
```javascript
app.post('/upload', withAuthentication({ permissions: ['file.upload']}), (req, res) => {
    res.status(200).send('uploaded file');
});
```
## Running the sample

After cloning the project, install it using

### `yarn`

In order to run the project, run
### `yarn start`

The application will be opened on [http://localhost:8080](http://localhost:8080) in development mode.

### Running few samples

Public route should be accessible without authentication.
```shell
curl -I http://localhost:8080/public
```

Private route should require authentication
```shell
curl -I http://localhost:8080/private
```

Admins route should require admin role
```shell
curl -I http://localhost:8080/admin
```

Upload route should require `file.upload` permission
```shell
curl -I http://localhost:8080/upload
```
