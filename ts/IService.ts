interface IService {
  description: string;
  url: string;
  checkIntervalInSeconds: number;
  getStatus(): Promise<IStatus>;
}