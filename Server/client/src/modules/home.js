import {inject} from 'aurelia-framework';

export class Home {
  constructor() {
          this.message = 'Home';
  }

  attached(){
    console.log('here')
  }

}

