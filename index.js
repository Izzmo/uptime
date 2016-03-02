'use strict';

const Resource = require('./app/resource');

let resources = [];
resources.push({ resource: new Resource('API', 'https://api.gtmsportswear.com', 30), interval: null });
resources.push({ resource: new Resource('GTM Home', 'http://gtmsportswear.com', 60), interval: null });
resources.push({ resource: new Resource('GTM Checkout', 'https://gtmsportswear.com/checkout.aspx', 60), interval: null });