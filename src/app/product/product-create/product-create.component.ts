import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCreation } from './../../shared/models/product.model';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {


  public ownerForm: FormGroup;

  constructor(private repository: RepositoryService,private router: Router) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl('', [Validators.required])
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


  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (ownerFormValue) => {
    const product: ProductCreation = {
      productName: ownerFormValue.productName,
      price: ownerFormValue.price,
      isDelete:false
    }

    const apiUrl = 'api/products';
    this.repository.create(apiUrl, product)
      .subscribe(res => {
          alert("Successfully Submitted")
          this.router.navigate(['product/list']);
        // $('#successModal').modal();
      }
    )
  }

  public redirectToProductList(){
    this.router.navigate(['product/list']);
  }

}
