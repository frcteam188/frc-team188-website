/*
 * ===== Module dependencies =====
 */
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const request = require('request');

/*
 * ===== Module body =====
 */


/**
 * On file exists and successful read will return parse JSON
 * otherwise returns false.
 * @param {string} file path to file to read in
 * @return {object|false} parsed JSON object from `file` or `false`
 */
function readToObj(file) {
    const fileExists = fs.existsSync(file);
    let obj = false;
    
    // check that file exists before reading
    if (fileExists) {
      const content = fs.readFileSync(file, 'utf-8');
  
      // try parsing JSON from file content
      try {
        obj = JSON.parse(content);
      } catch (err) {
        process.stderr.write(`Failed to read ${file} and convert to JSON parse.`);
      }
    }
  
    return obj;
  }

/*
 * ===== Module Exports =====
 */
module.exports = {
    readToObj: readToObj
  };