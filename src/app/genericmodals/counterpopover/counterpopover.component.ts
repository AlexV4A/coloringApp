import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { ModalService } from '../../shared/service/modal.service';

@Component({
  selector: 'app-couterpopover',
  templateUrl: './counterpopover.component.html',
  styleUrls: ['./counterpopover.component.css']
})
export class CounterpopoverComponent implements OnInit {

  public actionEvent = new EventEmitter();
  @Input() id: string;
  private element: any;
  public showMessage: Boolean = false;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.showMessage = true;
    // this.element.style.display = 'block';
    // this.element.classList.add('modal-open');
  }

  // close modal
  close(): void {
    this.showMessage = false;
    // this.element.style.display = 'none';
    // this.element.classList.remove('modal-open');
  }

}
