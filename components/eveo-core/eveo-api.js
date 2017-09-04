import {Config} from './eveo-config.js';

export class EveoApiCall {
  get headers(){
    let headers = new Headers();
    headers.append('accept', 'application/json');
    return headers;
  }

  formatArgs(args){
    let returnString = '?';
    Object.entries(args).forEach((idx,val) => {
      returnString+=escape(idx)+'='+escape(val)+'&';
    });
    return returnString.substring(0,returnString-1);
  }

  callApi(endpoint, method, args){
    //set default args.
    !args && (args = {});
    !args['datasource'] && (args['datasource'] = 'tranquility');

    //return the promised fetch.
    return fetch(Config.api+endpoint+this.formatArgs(args),{
      method: method,
      headers: this.headers
    });
  }
}

export const EveoApiHelper = new EveoApiCall();