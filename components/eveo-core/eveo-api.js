import {Config} from './eveo-config.js';

export class EveoApiCall {
  get headers(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    if(this.headerStorage){
      Object.entries(this.headerStorage).forEach((idx, val)=>{
        console.log(idx,val);
        headers.append(idx, val);
      });
    }
    //headers.append('Cache-Control', 'no-cache');
    // headers.append('X-User_agent', )
    return headers;
  }

  formatArgs(args){
    let returnString = '?';
    Object.entries(args).forEach((idx,val) => {
      returnString+=escape(idx)+'='+escape(val)+'&';
    });
    return returnString.substring(0,returnString-1);
  }

  callApi(endpoint, method, headers, args){
    this.headerStorage = null;
    //set default args.
    !args && (args = {});
    !args['datasource'] && (args['datasource'] = 'tranquility');

    headers && (this.headerStorage = headers);
    //return the promised fetch.
    return fetch(Config.api+endpoint+this.formatArgs(args),{
      method: method,
      headers: this.headers
    });
  }
}

export const EveoApiHelper = new EveoApiCall();