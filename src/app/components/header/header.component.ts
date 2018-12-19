import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../shared-services/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private _sharedService: SharedService, private _authService: AuthService) {

  }

  ngOnInit() {
    const userId = ((JSON.parse(localStorage.getItem('currentUser')) || {}).user || {}).id;
      this._sharedService.globalLogin$.subscribe((value) => {
        console.log('logged in ', value);
        this.loggedIn = value;
      });
  }

  logout(e) { 
    this._authService.logout();
  }

  OnDestroy() {
    this._sharedService.globalLogin$.unsubscribe();
  }

}
