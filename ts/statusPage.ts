const express = require('express');
const app = express();

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