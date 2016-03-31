import ServiceManager = require('./ServiceManager');
import CampaignMonitorService = require('./services/CampaignMonitorService');
import AuthorizeNetService = require('./services/AuthorizeNetService');

let services = [new CampaignMonitorService.CampaignMonitorService(), new AuthorizeNetService.AuthorizeNetService()];

let sm = new ServiceManager.ServiceManager(services);

module.exports = function () {
  console.log('\n=================');
  console.log('Welcome to Uptime');
  console.log('=================\n');
  sm.start();
};
