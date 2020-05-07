import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminCrudService } from 'src/app/@service/admin-crud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  public addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private adminCrudService: AdminCrudService,
  ) {
    this.addForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })
  }

  ngOnInit(): void { }

  public get f() {
    return this.addForm;
  }

  add(): void {
    if (this.f.value)
      this.adminCrudService.addContact(this.f.value)
        .pipe(first())
        .subscribe(
          data => {
            this.activeModal.close(data);
          }
        )
  }

}
