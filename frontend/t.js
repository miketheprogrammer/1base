glob = require('glob')
path = require('path')
g = glob.sync(
                                  path.join(__dirname, '**/node_modules')
                                ).map((dir) => path.dirname(dir))

console.log(g)

console.log(path.join(__dirname, '/node_modules/'))
