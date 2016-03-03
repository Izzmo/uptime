interface IService {
  url: string;
  checkIntervalInSeconds: number;
  getStatus(): Promise<IStatus>;
}