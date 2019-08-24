const proxyquire = require('proxyquire')
const test = require('tape')

test('it downloads a file to a temporary location and returns the path to the file', async t => {
  t.plan(1)

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
})

test('it throws an error if it fails to create a temporary directory', async t => {
  t.plan(1)

  const url = 'http://foo.bar/baz.jpg'
  const errMsg = 'foo'

  const tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: cb => cb(errMsg)
    }
  })

  try {
    await tmpdl(url)

    t.fail('expected tmpdl to throw')
  } catch ({ message }) {
    t.equals(message, errMsg, 'correct error is thrown')
  }
})

test('it throws an error if it fails to download the file', async t => {
  t.plan(1)

  const url = 'http://foo.bar/baz.jpg'
  const tmpDir = 'foo/bar'
  const errMsg = 'foo'

  const tmpdl = proxyquire('./index.js', {
    tmp: {
      tmpName: (cb) => cb(null, tmpDir)
    },
    download: () => Promise.reject(new Error(errMsg))
  })

  try {
    await tmpdl(url)

    t.fail('expected tmpdl to throw')
  } catch ({ message }) {
    t.equals(message, errMsg, 'correct error is thrown')
  }
})
