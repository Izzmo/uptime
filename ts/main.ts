import ServiceManager = require('./ServiceManager');
import CampaignMonitorService = require('./services/CampaignMonitorService');
import AuthorizeNetService = require('./services/AuthorizeNetService');
import GtmSportswearService = require('./services/GtmSportswearService');
import GtmSportswearHttpsService = require('./services/GtmSportswearHttpsService');
import GtmApiService = require('./services/GtmApiService');
import CoachsAssistantService = require('./services/CoachsAssistantService');
import TeamStoreService = require('./services/TeamStoreService');
import TSWService = require('./services/TSWService');

let services = [
  new CampaignMonitorService.CampaignMonitorService(),
  new AuthorizeNetService.AuthorizeNetService(),
  new GtmSportswearService.GtmSportswearService(),
  new GtmSportswearHttpsService.GtmSportswearHttpsService(),
  new GtmApiService.GtmApiService(),
  new CoachsAssistantService.CoachsAssistantService(),
  new TeamStoreService.TeamStoreService(),
  new TSWService.TeamStoreWebService()
];

let sm = new ServiceManager.ServiceManager(services);

module.exports = function () {
  console.log('\n=================');
  console.log('Welcome to Uptime');
  console.log('=================\n');
  sm.start();
};
