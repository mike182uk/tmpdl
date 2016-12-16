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
var temporaryDownload = require('tmp-dl')

var url = 'http://www.example.com/some-awesome-image.jpg'

temporaryDownload(url)
  .then(function (file) {
    // remote file downloaded to temporary location
  })
  .catch(function (err) {
    // something went wrong
  }) 
```

`tmp-dl` will return a [promise](https://github.com/petkaantonov/bluebird). The promise will resolve once the remote file has been downloaded. Any errors that occur during the download of the file, or the creation of the temporary location will cause the promise to reject.

The resolved file object will be a [Vinyl](https://github.com/gulpjs/vinyl) file:

```js
var temporaryDownload = require('tmp-dl')

var url = 'http://www.example.com/some-awesome-image.jpg'

temporaryDownload(url)
  .then(function (file) {
    var savedFilePath = file.path

    // do something with saved file path...
  })
```

Check out the documentation for [Vinyl](https://github.com/gulpjs/vinyl) to view the methods / properties available for the resolved file object.
