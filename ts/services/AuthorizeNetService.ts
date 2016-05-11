import { IService } from '../IService';
import { IStatus } from '../IStatus';

const scraperjs = require('scraperjs');

export class AuthorizeNetService implements IService {
  public description: string = 'Authorize.NET';
  public checkInterval = 10;
  public errorCheckInterval = 5;

  private _url = 'https://status.authorize.net';
  get url(): string {
    return this._url;
  }

  get checkIntervalInSeconds(): number {
    return this.checkInterval;
  }

  public getStatus(): Promise<IStatus> {
    return new Promise<IStatus>((promiseSuccess, promiseError) => {
      let elementFound = false;

      scraperjs.StaticScraper.create(this._url)
      .scrape($ => {
        elementFound = $('body.status-none, body.status-minor').length === 1;
      })
      .onStatusCode(code => {
        promiseSuccess({
          body: '',
          code: code,
          hasError: elementFound
        });
      })
      .catch(error => {
        promiseError(error);
      });
    });
  }
}
