var lcovSourcemap = require("lcov-sourcemap-x");
var fs = require('fs');
var path = require('path');

var regex = /(.*?\..*?)\.js\.map/g;
var jsFiles = /.js$/g;
fs.readdir('../coverage-output/storybook-static', function(err, files) {
    const filesWithoutMap = files
        .filter(file => !!jsFiles.exec(file))
    .filter(file =>
        files.indexOf(`${file}.map`) === -1
    );
    var dir = __dirname + '/tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0744);
    }
    filesWithoutMap.forEach(file => {
        console.log('moving', file);
        fs.renameSync(`../coverage-output/storybook-static/${file}`, `${dir}/${file}`);
    });

  const maps = files.map(file => regex.exec(file))
    .filter(match => !!match)
          .reduce((res, m) => ({
            ...res,
            [m[1]]: `../coverage-output/storybook-static/${m[0]}`
        }), {})


    lcovSourcemap.writeLcov(
        "../coverage-output/coverage/lcov.info",
        maps,
        "../coverage-output/",
        "../coverage-output/lcov-map.info"
    )
        .then(function () {
            console.log('lcov-map.info file based on source maps created')
    }).finally(function() {
        filesWithoutMap.forEach(file => {
            fs.renameSync(`${dir}/${file}`, `../coverage-output/storybook-static/${file}`);
        });
    });

})

// lcovSourcemap.writeLcov("../coverage-output/coverage/lcov.info", {
//   main: "../coverage-output/main.js.map",
//   polyfills: "../coverage-output/polyfills.js.map",
//   runtime: "../coverage-output/runtime.js.map",
//   styles: "../coverage-output/styles.js.map",
//   vendor:"../coverage-output/vendor.js.map"
// }, "../coverage-output/", "../coverage-output/lcov-map.info").then(function () {
//   console.log('lcov-map.info file based on source maps created')
// });
