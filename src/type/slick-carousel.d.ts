import 'jquery';

declare module 'jquery' {
  interface JQuery {
    slick(options?: any): JQuery;
    slick(method: string, ...args: any[]): JQuery;
  }
}