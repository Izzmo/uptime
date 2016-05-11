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
          this.handleServiceStatusResponse(service, s, callService);
          this.updateCallback(service.service, s);
        });
      };

      callService();
    });
    console.log(' ');
  }

  public stop(): void {
    this.serviceList.forEach((service) => {
      clearInterval(service.timer);
      service.timer = null;
    });
  }

  private handleServiceStatusResponse(serviceInterval: ServiceInterval, s: IStatus, serviceCaller: Function): void {
    if (s.hasError) {
      if (!serviceInterval.inErrorMode) {
        serviceInterval.inErrorMode = true;

        clearInterval(serviceInterval.timer);
        serviceInterval.timer = setInterval(() => {
          serviceCaller();
        }, 1000 * serviceInterval.service.errorCheckInterval);
      }
    }
    else if (serviceInterval.inErrorMode || null === serviceInterval.timer) {
      serviceInterval.inErrorMode = false;

      clearInterval(serviceInterval.timer);
      serviceInterval.timer = setInterval(() => {
        serviceCaller();
      }, 1000 * serviceInterval.service.checkIntervalInSeconds);
    }
  }
}
