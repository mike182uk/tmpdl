# tmp-dl

[![Version](https://img.shields.io/npm/v/tmp-dl.svg?style=flat-square)](https://www.npmjs.com/package/tmp-dl)
[![Build Status](https://img.shields.io/travis/mike182uk/tmp-dl.svg?style=flat-square)](http://travis-ci.org/mike182uk/tmp-dl)
[![Code Climate](https://img.shields.io/codeclimate/github/mike182uk/tmp-dl.svg?style=flat-square)](https://codeclimate.com/github/mike182uk/tmp-dl)
[![Coveralls](https://img.shields.io/coveralls/mike182uk/tmp-dl/master.svg?style=flat-square)](https://coveralls.io/r/mike182uk/tmp-dl)
[![npm](https://img.shields.io/npm/dm/tmp-dl.svg?style=flat-square)](https://www.npmjs.com/package/tmp-dl)
[![License](https://img.shields.io/github/license/mike182uk/tmp-dl.svg?style=flat-square)](https://www.npmjs.com/package/tmp-dl)

Download a remote file to a temporary location.

## Installation

```bash
npm install --save tmp-dl
```

## Usage

```js
const tmpdl = require('tmp-dl')

tmpdl('http://www.example.com/some-awesome-image.jpg')
  .then(filepath => {
    // remote file successfully downloaded and stored
  })
  .catch(err => {
    // something went wrong
  }) 
```

`tmpdl` will return a promise. The promise will resolve once the remote file has been downloaded. Any errors that occur during the download of the file, or the creation of the temporary directory that the remote file will be stored in, will cause the promise to reject.

```js
const tmpdl = require('tmp-dl')

tmpdl('http://www.example.com/some-awesome-image.jpg')
  .then(filepath => {
    // ...
  })
```
