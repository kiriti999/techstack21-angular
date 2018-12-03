import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared-services/shared.service';
import { ModalService } from '../../shared-services/modal.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private _sharedService: SharedService, private modal: ModalService) {

  }

  ngOnInit() {
    const userId = ((JSON.parse(localStorage.getItem('currentUser')) || {}).user || {}).id;
    if (typeof userId === 'undefined' || userId == null) {
      this._sharedService.globalLogin$.subscribe((value) => {
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
  modalOpen(e) {
    this.modal.modalOpen(e);
  }
}
