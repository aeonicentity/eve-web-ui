import EveoCore from '../eveo-core/eveo-core.js';

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
      tableData += `
      <tr>
        <td>${this.parsedData[i].faction}</td>
        <td>${this.parsedData[i].pilots}</td>
        <td>${this.parsedData[i].systems_controlled}</td>
        <td>${this.parsedData[i].kills.yesterday}</td>
        <td>${this.parsedData[i].victory_points.yesterday}</td>
      </tr>
      `
    }return tableData;
  }

  get template(){
    return `
      <h2>Faction Warfare Stats</h2>
      <table>
        <tr>
          <td>Faction</td>
          <td>Pilots</td>
          <td>Control</td>
          <td>Today's Kills</td>
          <td>VP</td>
        </tr>
        ${this.tableTemplate}
      </table>
    `;
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