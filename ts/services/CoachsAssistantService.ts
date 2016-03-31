const scraperjs = require('scraperjs');

export class CoachsAssistantService implements IService {
  public description: string = 'Coach\'s Assistant';
  public checkInterval = 60 * 5;
  public errorCheckInterval = 15;

  private _url = 'http://coachsassistant.gtmsportswear.com';
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
