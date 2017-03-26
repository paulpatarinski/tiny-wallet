var path = require('path');
var projRoot = path.join(__dirname, '..', '..');
var copyfiles = require('copyfiles');
var uiTestsBin = path.join(projRoot, 'ui_tests', 'bin', 'Debug');
var androidPhoneDest = path.join(projRoot, 'fastlane','metadata','android', 'en-US', 'images', 'phoneScreenshots');

copyfiles([uiTestsBin + "/android-phone*.png",androidPhoneDest], true, function (er, files) {
    console.log(files);
});