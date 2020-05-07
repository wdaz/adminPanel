import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminCrudService } from 'src/app/@service/admin-crud.service';
import { first } from 'rxjs/operators';
import { Contact } from 'src/app/@model/contact.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  public addForm: FormGroup;
  @Input() public contact: Contact;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private adminCrudService: AdminCrudService,
  ) {
   
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      _id: [this.contact._id],
      firstname: [this.contact.firstname, Validators.required],
      lastname: [this.contact.lastname, Validators.required],
      email: [this.contact.email, [Validators.required]],
      country: [this.contact.country, Validators.required],
      phoneNumber: [this.contact.phoneNumber, Validators.required],
    })
  }

  public get f() {
    return this.addForm;
  }

  edit(): void {
    if (this.f.value)
      this.adminCrudService.editContact(this.f.value)
        .pipe(first())
        .subscribe(
          data => {
            this.activeModal.close(data);
          }
        )
  }

}
