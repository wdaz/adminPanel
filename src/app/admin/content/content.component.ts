import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminCrudService } from 'src/app/@service/admin-crud.service';
import { first } from 'rxjs/operators';
import { Contact } from 'src/app/@model/contact.model';
import { AddModalComponent } from '../modal/add-modal/add-modal.component';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from '../modal/edit-modal/edit-modal.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  public headers: Array<string>;
  public contact: Array<Contact>;
  private event: Subscription;

  constructor(
    private adminCrudService: AdminCrudService,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) {
    this.headers = ['firstname', 'lastname', 'email', 'country', 'phone number', 'edit / delete'];
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnDestroy(): void {
    this.event.unsubscribe()
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.adminCrudService.getContacts()
      .pipe(first())
      .subscribe(
        data => this.contact = data,
        err => console.log(err)
      )
  }


  add(): void {
    this.modalService.open(AddModalComponent, { size: 'sm' })
      .result
      .then(
        ok => ok ? this.getUsers() : null,
        err => console.log(err),
      );
  }


  edit(contact: Contact) {
    const modal = this.modalService.open(EditModalComponent, { size: 'sm' });
    modal.componentInstance.contact = contact;
    modal.result
    .then(
      ok => ok ? this.getUsers() : null,
      err => console.log(err),
    );
  }

  delete(id: string) {
    this.adminCrudService.deleteContact(id).
      pipe(first())
      .subscribe(
        ok => this.getUsers(),
        err => console.log(err)
      )
  }

}
