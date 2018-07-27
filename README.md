# auth-tools
[![Build Status](https://secure.travis-ci.org/Eli-Goldberg/auth-tools.svg?branch=master)](http://travis-ci.org/Eli-Goldberg/auth-tools)[![Dependency Status](https://david-dm.org/Eli-Goldberg/auth-tools.svg)](https://david-dm.org/Eli-Goldberg/auth-tools)

A simple JWT encoding / encryption helper library

## Installing
```sh
$ npm i @compit/auth-tools
```

## Usage

### Simple jwt token

```js
const { encodeToken, decodeToken } = require('@compit/auth-tools');

const dataToEncode = { someData: 123 };
const jwtSecret = 'Some JWT Secret';

const token = await encodeToken({ 
  payload: { someData: 123 }, 
  expiresIn: '7d', 
  jwtSecret
});

const decodedToken = await decodeToken({ 
  token, // Same token we just encoded
  jwtSecret
});

console.log(decodedToken); // { someData: 123 }
```
### Using encryption

```js
const { encodeToken, decodeToken } = require('@compit/auth-tools');

const dataToEncode = { someData: 123 };
const shaPassword = 'Some encryption Password';
const jwtSecret = 'Some JWT Secret';

const token = await encodeToken({ 
  payload: { someData: 123 }, 
  expiresIn: '7d', 
  jwtSecret, 
  
  // Add these to have to token encrypt the data (AES SHA 256)
  isToEncrypt: true, 
  shaPassword
});

const decodedToken = await decodeToken({ 
  token, // Same token we just encoded
  jwtSecret, 

  // Add these to have to token decrypt the data (AES SHA 256)
  isToDecrypt: true, 
  shaPassword 
});

console.log(decodedToken); // { someData: 123 }
```