import { ServiceManager } from './ServiceManager';
import { CampaignMonitorService } from './services/CampaignMonitorService';
import { AuthorizeNetService } from './services/AuthorizeNetService';
import { GtmSportswearService } from './services/GtmSportswearService';
import { GtmSportswearHttpsService } from './services/GtmSportswearHttpsService';
import { GtmApiService } from './services/GtmApiService';
import { CoachsAssistantService } from './services/CoachsAssistantService';
import { TeamStoreService } from './services/TeamStoreService';
import { TeamStoreWebService } from './services/TSWService';

import { IStatus } from './IStatus';
import { IService } from './IService';

let services = [
  new CampaignMonitorService(),
  new AuthorizeNetService(),
  new GtmSportswearService(),
  new GtmSportswearHttpsService(),
  new GtmApiService(),
  new CoachsAssistantService(),
  new TeamStoreService(),
  new TeamStoreWebService()
];

let sm = new ServiceManager(services);
sm.setUpdateCallback((service: IService, status: IStatus) => {
  if (status.hasError) {
    let date = new Date();
    console.log(`[${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}] ${service.description}: Code ${status.code}`);
  }
});

export default function () {
  console.log('\n=================');
  console.log('Welcome to Uptime');
  console.log('=================\n');
  sm.start();
}
