const download = require('download')
const path = require('path')
const tmp = require('tmp')
const url = require('url')

/**
 * Exports
 */

module.exports = tmpdl

/**
 * Download a remote file to a temporary location
 *
 * @param   {string} src
 * @returns {Promise}
 */

function tmpdl (src) {
  return new Promise((resolve, reject) => {
    tmp.tmpName((err, tmpDir) => {
      if (err) {
        return reject(new Error(err))
      }

      download(src, tmpDir)
        .then(() => {
          let filename = url.parse(src).path
          let filepath = path.join(tmpDir, path.parse(filename).base)

          resolve(filepath)
        })
        .catch(err => {
          reject(new Error(err.message))
        })
    })
  })
}
