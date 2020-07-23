import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router } from '@angular/router';
import { admin } from 'src/app/shared/models/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public ownerForm: FormGroup;

  constructor(private repository: RepositoryService,private router: Router) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      adminid: new FormControl('', [Validators.required]),
      adminpassword: new FormControl('', [Validators.required])
    });
  }

  
  public validateControl = (controlName: string) => {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }


  public checklogin = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (ownerFormValue) => {
    const product: admin = {
      
      email: ownerFormValue.adminid,
      password: ownerFormValue.adminpassword,
    }

    const apiUrl = 'api/Common/Authenticate';
    this.repository.authenticate(apiUrl, product)
      .subscribe(res => {
        if(res==true)
        {
          alert("Successfully logged In")
          this.router.navigate(['/dashboard']);
        }
        else{
          alert("Login Failed ! Try Again ")
        }
      } ,
      (error) => {
        alert("Login Failed ! Try Again ")
       })
  }


}
