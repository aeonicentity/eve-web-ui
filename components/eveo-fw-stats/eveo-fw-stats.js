import EveoCore from '../eveo-core/eveo-core.js';
import StatsTableTpl from './eveo-fw-stats.html'
import StatsTableLineTpl from './eveo-fw-stats-line.html'

export class EveoFwStats extends HTMLElement{
  constructor(self){
    super(self);
    return self;
  }

  get headers(){
    let headers = new Headers();
    headers.append('accept', 'application/json');
    return headers;
  }

  get tableTemplate(){
    let tableData = "";
    for (let i=0; i<this.parsedData.length; i++){
      tableData += eval('`'+StatsTableLineTpl+'`');
    }return tableData;
  }

  get template(){
    return eval('`'+StatsTableTpl+'`');
  }

  get fwData(){
    return fetch('https://esi.tech.ccp.is/dev/fw/stats/?datasource=tranquility',{
      method: 'GET',
      headers: this.headers
    }).then((data)=>{
      return data.json()
    })
  }

  get factionsData(){
    return fetch('https://esi.tech.ccp.is/dev/universe/factions/?datasource=tranquility',{
      method: 'GET',
      headers: this.headers
    }).then((data)=>{
      return data.json();
    })
  }

  connectedCallback(){
    this.parsedData = [];
    this.shadow = this.attachShadow({mode: 'open'});
    
    this.fwData.then((fwData)=>{
      this.factionsData.then((factions)=>{
        console.log(factions);
        for(let i = 0; i < fwData.length; i++){
          for(let j = 0; j < factions.length; j++){
            console.log(fwData);
            if(factions[j].faction_id == fwData[i].faction_id){
              fwData[i].faction = factions[j].name;
              this.parsedData.push(fwData[i]);
              break;
            }
          }
          console.log(this.parsedData);
        }this.shadow.innerHTML = this.template;
      })
    });
  }
}

const EveoFwStatsComponent = window.customElements.define('eveo-fw-stats', EveoFwStats);
export default EveoFwStatsComponent; 