import { IService } from '../IService';
import { IStatus } from '../IStatus';

const scraperjs = require('scraperjs');

export class GtmSportswearHttpsService implements IService {
  public description: string = 'GTM Sportswear TLS Check';
  public checkInterval = 60 * 5;
  public errorCheckInterval = 15;

  private _url = 'https://gtmsportswear.com/login.aspx';
  get url(): string {
    return this._url;
  }

  get checkIntervalInSeconds(): number {
    return this.checkInterval;
  }

  public getStatus(): Promise<IStatus> {
    return new Promise<IStatus>((promiseSuccess, promiseError) => {
      scraperjs.StaticScraper.create(this._url)
      .scrape($ => {
        return true;
      })
      .onStatusCode(code => {
        promiseSuccess({
          body: '',
          code: code,
          hasError: !(code === 200 || code === 201)
        });
      })
      .catch(error => {
        promiseError(error);
      });
    });
  }
}
