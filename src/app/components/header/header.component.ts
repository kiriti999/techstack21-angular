import { Component, OnInit } from '@angular/core';
import { GlobalLoginService } from '../../shared-services/global-login.service';
import { ModalService } from '../../shared-services/modal.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private _globalLoginService: GlobalLoginService, private modal: ModalService) {

  }

  ngOnInit() {
    var userId = ((JSON.parse(localStorage.getItem('currentUser')) || {}).user || {}).id;
    if (typeof userId == "undefined" || userId == null) {
      this._globalLoginService.globalLogin$.subscribe((value) => {
        this.loggedIn = value;
      });
    } else {
      this.loggedIn = true;
    }
  }

  /**
  Opens modal
  @param {event} event - Event passed from click
 */
  modalEvent(e) {
    this.modal.modalEvent(e);
  }
}
