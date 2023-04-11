#### ⚠️ This project is no longer maintained

# tmpdl

[![Version](https://img.shields.io/npm/v/tmpdl.svg?style=flat-square)](https://www.npmjs.com/package/tmpdl)
[![Build Status](https://img.shields.io/github/actions/workflow/status/mike182uk/tmpdl/ci.yml?branch=main&style=flat-square)](https://github.com/mike182uk/tmpdl/actions/workflows/ci.yml?query=workflow%3ACI)
[![Coveralls](https://img.shields.io/coveralls/mike182uk/tmpdl/main.svg?style=flat-square)](https://coveralls.io/r/mike182uk/tmpdl)
[![npm](https://img.shields.io/npm/dm/tmpdl.svg?style=flat-square)](https://www.npmjs.com/package/tmpdl)
[![License](https://img.shields.io/github/license/mike182uk/tmpdl.svg?style=flat-square)](https://www.npmjs.com/package/tmpdl)

Download a remote file to a temporary location.

## Installation

```bash
npm install --save tmpdl
```

## Usage

```js
const tmpdl = require('tmpdl')

try {
  const filepath = await tmpdl('http://www.example.com/some-awesome-image.jpg')

  // remote file successfully downloaded and stored
} catch (err) {
  // something went wrong
}
```

`tmpdl` will return a promise which will resolve to the path of the saved file. Any errors that occur during the download of the file, or the creation of the temporary directory that the remote file will be stored in, will cause the promise to reject.
