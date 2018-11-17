import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  button: any;
  constructor() { }

  ngOnInit() {
    this.button = document.querySelector(`button[data-modal-trigger]`);
  }

}
