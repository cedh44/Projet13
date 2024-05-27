import { Component } from '@angular/core';
import {SessionService} from "../../Service/session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(public sessionService: SessionService) {
  }

  ngOnInit() {
    console.log('user connecté : '+this.sessionService.userSession?.id + ' / ' + this.sessionService.userSession?.username);
  }
}
