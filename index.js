'use strict';

const request = require('request');
const express = require('express');
const Resource = require('./app/resource');
const app = express();

let resources = [];
resources.push({ resource: new Resource('API', 'https://api.gtmsportswear.com', 30), interval: null });
resources.push({ resource: new Resource('GTM Home', 'http://gtmsportswear.com', 60), interval: null });
resources.push({ resource: new Resource('GTM Checkout', 'https://gtmsportswear.com/checkout.aspx', 60), interval: null });

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

function getHtml_EachResource() {
    let x = '';
    resources.forEach((r) => {
        let h = r.resource.getHistory();
        if(h.length === 0) return;
        x += `<div class="resource"><span class="status">${h[0].status}</span> ${r.resource.description}</div>`;
    });
    return x;
}
function getHtml() {
    let template = `
    <!doctype html>
    <html>
    <head>
        <title>Status</title>
    </head>
    <body>
        <h1>Status</h1>
        ${getHtml_EachResource()}
    </body>
    </html>
    `;
    return template;
}


app.get('/', (req, res) => {
  res.send(getHtml());
});
app.listen(process.env.PORT, process.env.IP);