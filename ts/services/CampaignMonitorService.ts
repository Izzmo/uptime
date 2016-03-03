const request = require('request');

export class CampaignMonitorService implements IService {
  private _url = 'https://status.campaignmonitor.com';
  get url(): string {
    return this._url;
  }

  private _interval = 30;
  get checkIntervalInSeconds(): number {
    return this._interval;
  }

  public getStatus(): Promise<IStatus> {
    return new Promise<IStatus>((success, error) => {
      request(this._url, (error, response, body) => {
        let statusObj = {
          body: body,
          code: response.statusCode,
          hasError: error
        };
        success(statusObj);
      });
    });
  }
}
