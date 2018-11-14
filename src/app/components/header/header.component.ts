import { Component, OnInit } from '@angular/core';
import { GlobalLoginService } from '../../shared-services/global-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private _globalLoginService: GlobalLoginService) {

  }

  ngOnInit() {
    var userId =  ((JSON.parse(localStorage.getItem('currentUser'))||{}).user||{}).id;
    if (typeof userId == "undefined" || userId == null) {
      this._globalLoginService.globalLogin$.subscribe((value) => {
        this.loggedIn = value;
      });
    } else {
      this.loggedIn = true;
    }
  }
}
