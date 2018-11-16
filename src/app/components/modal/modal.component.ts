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

  modalEvent(e) {
      const trigger = e.target.getAttribute('data-modal-trigger');
      const modal = document.querySelector(`[data-modal=${trigger}]`);
      const contentWrapper = modal.querySelector('.content-wrapper');
      const close = modal.querySelector('.close');

      close.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', () => modal.classList.remove('open'));
      contentWrapper.addEventListener('click', (e) => e.stopPropagation());
      modal.classList.toggle('open');
  }


}
