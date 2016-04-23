import { IService } from './IService';
import { IStatus } from './IStatus';

interface IServiceInterval {
  service: IService;
  timer: NodeJS.Timer;
  history: Array<IStatus>;
}

export class ServiceManager {
  private serviceList: IServiceInterval[] = [];
  private updateCallback: Function;

  constructor(serviceList: Array<IService>) {
    serviceList.forEach((service) => {
      this.serviceList.push({ service: service, timer: null, history: [] });
    });
  }

  public setUpdateCallback(fn: Function): void {
    if(undefined !== fn && null !== fn)
      this.updateCallback = fn;
  }

  public start(): void {
    this.serviceList.forEach(service => {
      if (service.timer !== null) clearInterval(service.timer);

      let callService = () => {
        service.service.getStatus().then(s => {
          this.updateCallback(service.service, s);
        });
      };

      callService();
      service.timer = setInterval(() => {
        callService();
      }, 1000 * service.service.checkIntervalInSeconds);
    });
  }

  public stop(): void {
    this.serviceList.forEach((service) => {
      clearInterval(service.timer);
      service.timer = null;
    });
  }
}
