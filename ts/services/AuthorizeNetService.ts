const scraperjs = require('scraperjs');

export class AuthorizeNetService implements IService {
  public description: string = 'Authorize.NET';
  private _url = 'https://status.authorize.net';
  get url(): string {
    return this._url;
  }

  private _interval = 30;
  get checkIntervalInSeconds(): number {
    return this._interval;
  }

  public getStatus(): Promise<IStatus> {
    return new Promise<IStatus>((promiseSuccess, promiseError) => {
      let elementFound = false;

      scraperjs.StaticScraper.create(this._url)
      .scrape($ => {
        elementFound = $('.page-status.status-none').length === 0;
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
