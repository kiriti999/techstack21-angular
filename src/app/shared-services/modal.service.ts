import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  modalOpen(e) {

    const trigger = e.target.getAttribute('data-modal-trigger');
    const modal = document.querySelector(`[data-modal=${trigger}]`);
    const contentWrapper = modal.querySelector('.content-wrapper');
    const close = modal.querySelector('.close');
    console.log('e.target ', e.target);

    // if (e.target.classList[0] === 'blog-update') {
    //   modal.querySelector('.modal-header h2').innerHTML = 'Edit blog';
    // }

    close.addEventListener('click', () => modal.classList.remove('open'));
    // modal.addEventListener('click', () => modal.classList.remove('open'));
    // tslint:disable-next-line:no-shadowed-variable
    // contentWrapper.addEventListener('click', (e) => e.stopPropagation());
    modal.classList.toggle('open');
  }

  modalClose() {
    const modal = document.querySelector('.modal.open');
    const modalSubmit = modal.querySelector('.modal-submit');
    modalSubmit.addEventListener('click', () => modal.classList.remove('open'));
    document.querySelector('.modal-header > h2').textContent = 'Create category';
  }
}
