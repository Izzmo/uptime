import { IService } from './IService';
import { IStatus } from './IStatus';

interface IServiceInterval {
  service: IService;
  timer: NodeJS.Timer;
  history: Array<IStatus>;
}

export class ServiceManager {
  private serviceList: Array<IServiceInterval> = [];

  constructor(serviceList: Array<IService>) {
    serviceList.forEach((service) => {
      this.serviceList.push({ service: service, timer: null, history: [] });
    });
  }

  public start(): void {
    this.serviceList.forEach(service => {
      if (service.timer !== null) clearInterval(service.timer);

      let callService = () => {
        service.service.getStatus().then(s => {
          console.log(service.service.description + ': ' + (s.hasError ? 'Problematic!' : 'Good =)'));
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
