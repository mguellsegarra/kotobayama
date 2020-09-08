
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    module.exports = require('./mobx.min.js');
} else {
    module.exports = require('./mobx.js');
}
        