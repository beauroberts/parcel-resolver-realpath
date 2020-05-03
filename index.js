const fs = require("fs");
const { CONFIG, Resolver } = require("@parcel/plugin");
const DefaultResolver = require("@parcel/resolver-default");

module.exports = new Resolver({
  resolve(args) {
    return DefaultResolver.default[CONFIG].resolve(args).then((result) => {
      if (!result) {
        return result;
      }

      return new Promise((resolve, reject) => {
        fs.realpath(result.filePath, (err, resolvedPath) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(
            Object.assign({}, result, {
              filePath: resolvedPath,
            })
          );
        });
      });
    });
  },
});
