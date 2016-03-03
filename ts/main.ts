import ServiceManager = require('./ServiceManager');
import CampaignMonitorService = require('./services/CampaignMonitorService');

let services = [new CampaignMonitorService.CampaignMonitorService()];

let sm = new ServiceManager.ServiceManager(services);

module.exports = function () {
  sm.start();
};
