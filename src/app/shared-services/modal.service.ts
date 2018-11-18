import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  modalEvent(e) {
    console.log(e);

    const trigger = e.target.parentNode.getAttribute('data-modal-trigger');
    const modal = document.querySelector(`[data-modal=${trigger}]`);
    const contentWrapper = modal.querySelector('.content-wrapper');
    const close = modal.querySelector('.close');
    const modalSubmit = modal.querySelector('.modal-submit');

    if (e.target.parentNode.classList[0] === 'blog-update') {
      modal.querySelector('.modal-header h2').innerHTML = 'Edit blog';
    }

    close.addEventListener('click', () => modal.classList.remove('open'));
    modalSubmit.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', () => modal.classList.remove('open'));
    // tslint:disable-next-line:no-shadowed-variable
    contentWrapper.addEventListener('click', (e) => e.stopPropagation());
    modal.classList.toggle('open');
  }
}
