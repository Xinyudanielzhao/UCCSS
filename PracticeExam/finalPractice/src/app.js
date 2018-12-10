
import {AuthorizeStep} from 'aurelia-auth';


export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.map([
      {
        route: 'foos',
        moduleId: './modules/foos',
        name: 'Foos',
        auth: true 
      },
      
    ]);
  }
}