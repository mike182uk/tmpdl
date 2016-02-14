# tmpdl

[![Version](https://img.shields.io/npm/v/tmpdl.svg?style=flat-square)](https://www.npmjs.com/package/tmpdl)
[![Build Status](https://img.shields.io/travis/mike182uk/tmpdl.svg?style=flat-square)](http://travis-ci.org/mike182uk/tmpdl)
[![Code Climate](https://img.shields.io/codeclimate/github/mike182uk/tmpdl.svg?style=flat-square)](https://codeclimate.com/github/mike182uk/tmpdl)
[![Coveralls](https://img.shields.io/coveralls/mike182uk/tmpdl/master.svg?style=flat-square)](https://coveralls.io/r/mike182uk/tmpdl)
[![npm](https://img.shields.io/npm/dm/tmpdl.svg?style=flat-square)](https://www.npmjs.com/package/tmpdl)
[![License](https://img.shields.io/github/license/mike182uk/tmpdl.svg?style=flat-square)](https://www.npmjs.com/package/tmpdl)

Download a remote file to a temporary location.

## Installation

```bash
npm install --save tmpdl
```

## Usage

```js
var tmpdl = require('tmpdl');

var url = 'http://www.example.com/some-awesome-image.jpg';

tmpdl(url)
  .then(function(file) {
    // remote file downloaded to temporary location  
  })
  .catch(function(err) {
    // something went wrong
  });  
```

`tmpdl` will return a [promise](https://github.com/petkaantonov/bluebird). The promise will resolve once the remote file has been downloaded. Any errors that occur during the download of the file, or the creation of the temporary location will cause the promise to reject.

The resolved file object will be a [Vinyl](https://github.com/gulpjs/vinyl) file:

```js
var tmpdl = require('tmpdl');

var url = 'http://www.example.com/some-awesome-image.jpg';

tmpdl(url)
  .then(function(file) {
    var savedFilePath = file.path;
    
    // do something with saved file path...       
  });
```

Check out the documentation for [Vinyl](https://github.com/gulpjs/vinyl) to view the methods / properties available for the resolved file object.
