var request = require('request');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

const pinyin = require("pinyin");

var lodash = require("lodash");

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

// fs.createReadStream('pinyinToWG.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//   });

exports.translateViaWeb = async function (chinese_name) {
  return new Promise((resolve, reject) => {
    request.post({
      url: 'http://www.englishname.org/',
      form: {
        "name": chinese_name
      }
    }, async function (err, httpResponse, body) {
      var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, error: function (e) { }, fatalError: function (e) { console.error(e) } }
      }).parseFromString(body);
      var nodes = xpath.select("(//tr[4]/td[2])[2]", doc);
      resolve(nodes[0].lastChild.data);
    });
  });
}

exports.translate = async function (chinese_name) {

  return new Promise((resolve, reject) => {
    fs.createReadStream('pinyinToWG.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {

        // Get Pin Yin format from raw a chinese name
        var pinyinResultArray = pinyin(chinese_name, { style: pinyin.STYLE_NORMAL, heteronym: false });

        var finalResult = []
        // Iterate through each Pin Yin character to get its matched WG character
        pinyinResultArray.forEach(function (pinyinTarget) {
          finalResult.push(results.find(element => element['0'] === pinyinTarget[0].toUpperCase())['1']);
        });

        var res = finalResult.join(" ");

        resolve(res)
      });
  });

}