'use strict';

let history = [];

function Resource(description, url, interval) {
  this.description = description;
  this.url = url;
  this.interval = interval;
}
Resource.prototype.setHistory = function (statusObj) {
  history.push(statusObj);
}
Resource.prototype.getHistory = function () {
  return history;
}
Resource.prototype.toString = function () {
  return this.description;
}

module.exports = Resource;