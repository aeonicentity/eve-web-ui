export class EveoFwStats extends HTMLElement{
  constructor(self){
    super(self);
    return self;
  }

  get template(){
    return `
      <p>test</p>
    `;
  }

  get fwData(){
    let headers = new Headers();
    headers.append('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    headers.append('content-type','text/plain');
    headers.append('cache-control', 'no-cache');
    headers.append('upgrade-insecure-requests',1);
    headers.append('accept-encoding','gzip, deflate, br');
    headers.append('accept-language','en-US,en;q=0.8');
    headers.append('cache-control','no-cache');
    headers.append('authority','esi.tech.ccp.is');
    headers.append('method','GET');
    headers.append('path','/dev/fw/stats/');
    headers.append('scheme','https');
    return fetch('https://esi.tech.ccp.is/dev/fw/stats',{
      method: 'GET',
      headers: headers
    }).then((data)=>{
      console.log(data);
    })
  }

  connectedCallback(){
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = this.template;
    this.fwData;
  }
}

const EveoFwStatsComponent = window.customElements.define('eveo-fw-stats', EveoFwStats);
export default EveoFwStatsComponent; 