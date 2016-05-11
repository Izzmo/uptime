import { IService } from './IService';
import { IStatus } from './IStatus';

interface ServiceInterval {
  service: IService;
  timer: NodeJS.Timer;
  history: IStatus[];
  inErrorMode: boolean;
}

export class ServiceManager {
  private serviceList: ServiceInterval[] = [];
  private updateCallback: Function;

  constructor(serviceList: Array<IService>) {
    serviceList.forEach((service) => {
      this.serviceList.push({ service: service, timer: null, history: [], inErrorMode: false });
    });
  }

  public setUpdateCallback(fn: Function): void {
    if (undefined !== fn && null !== fn)
      this.updateCallback = fn;
  }

  public start(): void {
    this.serviceList.forEach(service => {
      if (service.timer !== null) clearInterval(service.timer);

      console.log(`Service start: ${service.service.description}`);

      const callService = () => {
        service.service.getStatus().then(s => {
          if (s.hasError) {
            if (!service.inErrorMode) {
              console.log('toggle');
              service.inErrorMode = true;

              clearInterval(service.timer);
              service.timer = setInterval(() => {
                callService();
              }, 1000 * service.service.errorCheckInterval);
            }
          }
          else if (service.inErrorMode) {
            service.inErrorMode = false;

            clearInterval(service.timer);
            service.timer = setInterval(() => {
              callService();
            }, 1000 * service.service.checkIntervalInSeconds);
          }

          this.updateCallback(service.service, s);
        });
      };

      callService();
    });
  }

  public stop(): void {
    this.serviceList.forEach((service) => {
      clearInterval(service.timer);
      service.timer = null;
    });
  }
}
