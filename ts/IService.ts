import { IStatus } from './IStatus';

export interface IService {
  description: string;
  url: string;
  checkIntervalInSeconds: number;
  checkInterval: number;
  errorCheckInterval: number;
  getStatus(): Promise<IStatus>;
}
