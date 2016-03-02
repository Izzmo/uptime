const request = require('request');

function performRequest(resource) {
  request(resource.url, (error, response, body) => {
    var statusObj = {
      status: response.statusCode,
      text: response.statusText,
      body: body,
      error: error
    };
    resource.setHistory(statusObj);
  });
}

resources.forEach((el) => {
  el.interval = setInterval(function () {
    performRequest(this.resource);
  }.bind(el), el.resource.interval * 1000);
});