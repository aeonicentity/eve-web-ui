import EveoPilotTemplate from './eveo-pilot.html';
import {EveoApiHelper} from '../eveo-core/eveo-api.js';

export class EveoPilot extends HTMLElement{
  
  get portraits(){
    return EveoApiHelper.callApi('characters/'+this.pilotId+'/portrait','GET', {'cache-control':'no-cache'})
      .then((data)=>{
        console.log(data.json());
        return data.json();
      });
  }

  get apiName(){
    return EveoApiHelper.callApi('characters/names/','GET').then((data)=>{
      return data.json()['character_id'];
    });
  }
  
  get apiId(){
    if(this.pilotName){
      return EveoApiHelper.callApi('characters/names/','GET').then((data)=>{
        return data.json()['character_id'];
      });
    }
  }

  get pilotId(){
    return this.getAttribute('pilot-id');
  }
  get pilotName() {
    return this.getAttribute('pilot-name');
  }
  connectedCallback(){
    // this.portrait = this.potraits[''];
    this.innerHTML = eval('`'+EveoPilotTemplate+'`');
  }
}

const EveoPilotComponent = window.customElements.define('eveo-pilot', EveoPilot);
export default EveoPilotComponent; 