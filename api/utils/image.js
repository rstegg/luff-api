const crypto = require('crypto')
const from = require('from2')

export function fromBuffer (buffer) {
  // assert.ok(Buffer.isBuffer(buffer))

  return from(function (size, next) {
    if (buffer.length <= 0) {
      return this.push(null)
    }

    console.log(this.push(null))

    const chunk = buffer.slice(0, size)
    buffer = buffer.slice(size)

    next(null, chunk)
  })
}

export function bufferToHash (buffer) {
  const hash = crypto.createHash('sha256')
  hash.update(buffer)
  return hash.digest('hex')
}
