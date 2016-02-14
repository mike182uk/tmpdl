var Download = require('download');
var Promise = require('bluebird');
var tmp = require('tmp');

/**
 * Exports
 */

module.exports = temporaryDownload;

/**
 * Download a remote file to a temporary location
 *
 * @param   {string} url
 * @returns {Promise}
 */

function temporaryDownload(url) {
  return new Promise(function(resolve, reject) {
    tmp.tmpName(function(err, tmpPath) {
      if (err) {
        return reject(err);
      }

      new Download()
        .get(url)
        .dest(tmpPath)
        .run(function(err, files) {
          if (err) {
            return reject(err);
          }

          resolve(files.shift());
        });
    });
  });
}
