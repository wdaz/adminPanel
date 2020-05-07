import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@service/auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {

  public singInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f(): FormGroup {
    return this.singInForm
  }

  createForm(): void {
    this.singInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/)]]
    })
  }

  onSubmit(): void {
    if(this.f.valid) 
    this.authService.singIn(this.f.value)
    .pipe(first()).subscribe(ok => {
      if (this.activeRouter.snapshot.queryParams.url) {
         return this.router.navigate([this.activeRouter.snapshot.queryParams.url]);
      }
      this.router.navigate(['dashboard']);
   },
   err=>console.log(err)
   );
  }
}
