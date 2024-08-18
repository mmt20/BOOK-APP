exports.generateStoreCode = () => {
  var randomstring = require("randomstring");

  return randomstring.generate({
    length: 5,
    charset: 'alphabetic',
    capitalization: 'uppercase',
  });
}