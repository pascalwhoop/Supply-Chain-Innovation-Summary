"use strict";
exports.__esModule = true;
var fs = require("fs");
var watch = require("watch");
var home = require('os').homedir();
var username = require('os').userInfo().username;
var DESKTOP_PATH = home + "/Desktop/";
var IMAGES_PATH = "./images/" + username + "/";
//making sure the folder exists.
if (!fs.existsSync(IMAGES_PATH)) {
    fs.mkdirSync(IMAGES_PATH);
}
var lastNumber = calculateLastNumber();
watch.watchTree(DESKTOP_PATH, {}, function () { return copyScreenShots(); });
// _____ HELPER FUNCTIONS ______
function copyScreenShots() {
    var desktop = fs.readdirSync(DESKTOP_PATH);
    lastNumber = calculateLastNumber();
    desktop.forEach(function (file) {
        if (file.indexOf(".png") >= 0) {
            console.log("COPYING SCREEN SHOT");
            fs.renameSync(DESKTOP_PATH + file, IMAGES_PATH + (++lastNumber) + ".png");
        }
    });
}
function calculateLastNumber() {
    var imgCounter = [];
    var images = fs.readdirSync(IMAGES_PATH);
    images.map(function (img) {
        var matches = /(^[^\.]+)/.exec(img);
        if (matches)
            return imgCounter.push(matches[1]);
    });
    var highest = 0;
    imgCounter.forEach(function (count) {
        count = Number(count);
        highest = highest < count ? count : highest;
    });
    return highest;
}
