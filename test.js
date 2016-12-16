var rewire = require('rewire')
var test = require('tape')

var temporaryDownload = rewire('./index')

test('it downloads a file to a temporary location', function (t) {
  var url = 'http://foo.bar/baz.jpg'
  var tmpName = 'foo/bar'
  var tmpFilePath = tmpName + '/baz.jpg'

  var tmp = {
    tmpName: function (cb) {
      cb(null, tmpName)
    }
  }

  var download = function () {
    return {
      get: function () { return this },
      dest: function () { return this },
      run: function (cb) {
        cb(null, [{ path: tmpFilePath }])
      }
    }
  }

  temporaryDownload.__set__({
    Download: download,
    tmp: tmp
  })

  temporaryDownload(url).then(function (file) {
    t.equal(file.path, tmpFilePath, 'file is downloaded to the correct location')

    t.end()
  })
})

test('it rejects the promise if it fails to get a tmp directory', function (t) {
  var tmpNameErr = 'foo'
  var url = 'http://foo.bar/baz.jpg'

  var tmp = {
    tmpName: function (cb) {
      cb(tmpNameErr)
    }
  }

  temporaryDownload.__set__({
    tmp: tmp
  })

  temporaryDownload(url).catch(function (err) {
    t.equal(err, tmpNameErr, 'promise is rejected with correct error message')

    t.end()
  })
})

test('it rejects the promise if it fails to download the file', function (t) {
  var url = 'http://foo.bar/baz.jpg'
  var tmpName = 'foo/bar'
  var downloadRunErr = 'foo'

  var tmp = {
    tmpName: function (cb) {
      cb(null, tmpName)
    }
  }

  var download = function () {
    return {
      get: function () { return this },
      dest: function () { return this },
      run: function (cb) {
        cb(downloadRunErr)
      }
    }
  }

  temporaryDownload.__set__({
    Download: download,
    tmp: tmp
  })

  temporaryDownload(url).catch(function (err) {
    t.equal(err, downloadRunErr, 'promise is rejected with correct error message')

    t.end()
  })
})
