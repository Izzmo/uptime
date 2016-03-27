import ServiceManager = require('./ServiceManager');
import CampaignMonitorService = require('./services/CampaignMonitorService');
import AuthorizeNetService = require('./services/AuthorizeNetService');

let services = [new CampaignMonitorService.CampaignMonitorService(), new AuthorizeNetService.AuthorizeNetService()];

let sm = new ServiceManager.ServiceManager(services);

module.exports = function () {
  sm.start();
};
