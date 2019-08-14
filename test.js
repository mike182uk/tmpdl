const proxyquire = require('proxyquire')
const test = require('tape')

test('it downloads a file to a temporary location and returns the path to the file', async t => {
  const url = 'http://foo.bar/baz.jpg'
  const tmpDir = 'foo/bar'
  const expectedFilePath = `${tmpDir}/baz.jpg`

  const tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: (cb) => cb(null, tmpDir)
    },
    download: () => Promise.resolve()
  })

  const filepath = await tmpdl(url)

  t.equal(filepath, expectedFilePath, 'file is downloaded to the correct location')

  t.end()
})

test('it throws an error if it fails to create a temporary directory', async t => {
  const url = 'http://foo.bar/baz.jpg'
  const errorMsg = 'foo'

  const tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: cb => cb(errorMsg)
    }
  })

  try {
    await tmpdl(url)

    t.fail('expected tmpdl to throw')
  } catch (err) {
    t.equals(err.message, errorMsg, 'correct error is thrown')
  }

  t.end()
})

test('it throws an error if it fails to download the file', async t => {
  const url = 'http://foo.bar/baz.jpg'
  const tmpDir = 'foo/bar'
  const expectedError = new Error('foo')

  const tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: (cb) => cb(null, tmpDir)
    },
    download: () => Promise.reject(expectedError)
  })

  try {
    await tmpdl(url)

    t.fail('expected tmpdl to throw')
  } catch (err) {
    t.equals(err.message, expectedError.message, 'correct error is thrown')
  }

  t.end()
})
