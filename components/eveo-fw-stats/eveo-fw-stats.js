//import EveoCore from '../eveo-core/eveo-core.js';
import StatsTableTpl from './eveo-fw-stats.html';
import StatsTableLineTpl from './eveo-fw-stats-line.html';
import {EveoApiHelper} from '../eveo-core/eveo-api.js';
// import {Config} from '../eveo-core/eveo-config.js';

export class EveoFwStats extends HTMLElement{
  constructor(self){
    super(self);
    return self;
  }

  get tableTemplate(){
    let tableData = '';
    for (let i=0; i<this.parsedData.length; i++){
      tableData += eval('`'+StatsTableLineTpl+'`');
    }return tableData;
  }

  get template(){
    return eval('`'+StatsTableTpl+'`');
  }

  get fwData(){
    return EveoApiHelper.callApi('fw/stats/','GET').then((data)=>{
      return data.json();
    });
  }

  get factionsData(){
    return EveoApiHelper.callApi('universe/factions/','GET').then((data)=>{
      return data.json();
    });
  }

  connectedCallback(){
    this.parsedData = [];
    this.shadow = this.attachShadow({mode: 'open'});
    
    this.fwData.then((fwData)=>{
      this.factionsData.then((factions)=>{
        for(let i = 0; i < fwData.length; i++){
          for(let j = 0; j < factions.length; j++){
            if(factions[j].faction_id == fwData[i].faction_id){
              fwData[i].faction = factions[j].name;
              this.parsedData.push(fwData[i]);
              break;
            }
          }
        }this.shadow.innerHTML = this.template;
      });
    });
  }
}

const EveoFwStatsComponent = window.customElements.define('eveo-fw-stats', EveoFwStats);
export default EveoFwStatsComponent; 