import ServiceManager = require('./ServiceManager');
import CampaignMonitorService = require('./services/CampaignMonitorService');
import AuthorizeNetService = require('./services/AuthorizeNetService');
import GtmSportswearService = require('./services/GtmSportswearService');
import GtmSportswearHttpsService = require('./services/GtmSportswearHttpsService');

let services = [
  new CampaignMonitorService.CampaignMonitorService(),
  new AuthorizeNetService.AuthorizeNetService(),
  new GtmSportswearService.GtmSportswearService(),
  new GtmSportswearHttpsService.GtmSportswearHttpsService()
];

let sm = new ServiceManager.ServiceManager(services);

module.exports = function () {
  console.log('\n=================');
  console.log('Welcome to Uptime');
  console.log('=================\n');
  sm.start();
};
