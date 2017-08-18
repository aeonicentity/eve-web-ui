export default class EveoCore extends HTMLElement{
  constructor(self){
    super(self);
    return self;
  }

  fetchContext(match, context){
    let argsList = match.split('.')
  }

  template(string, context){
    string.replace(/\$\{.+?\}/g,this.fetchContext(context))
  }
}