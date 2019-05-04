const proxyquire = require('proxyquire')
const test = require('tape')

test('it downloads a file to a temporary location and resolves with the path to the file', t => {
  let url = 'http://foo.bar/baz.jpg'
  let tmpDir = 'foo/bar'
  let expectedFilePath = `${tmpDir}/baz.jpg`

  let tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: (cb) => cb(null, tmpDir)
    },
    download: () => Promise.resolve()
  })

  tmpdl(url).then(filepath => {
    t.equal(filepath, expectedFilePath, 'file is downloaded to the correct location')

    t.end()
  })
})

test('it rejects the promise if it fails to create a temporary directory', t => {
  let url = 'http://foo.bar/baz.jpg'
  let errorMsg = 'foo'
  let expectedError = new Error(errorMsg)

  let tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: cb => cb(errorMsg)
    }
  })

  tmpdl(url).catch(function (err) {
    t.deepEqual(err, expectedError, 'promise is rejected with correct error')

    t.end()
  })
})

test('it rejects the promise if it fails to download the file', t => {
  let url = 'http://foo.bar/baz.jpg'
  let tmpDir = 'foo/bar'
  let expectedError = new Error('foo')

  let tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: (cb) => cb(null, tmpDir)
    },
    download: () => Promise.reject(expectedError)
  })

  tmpdl(url).catch(function (err) {
    t.deepEqual(err, expectedError, 'promise is rejected with correct error')

    t.end()
  })
})
