import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  public owner: product;
  public ownerForm: FormGroup;

  constructor(private repository: RepositoryService,private activeRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl('', [Validators.required])
    });

    this.getOwnerById();
  }

  private getOwnerById = () => {
    let ownerId: string = this.activeRoute.snapshot.params['id'];
      
    let ownerByIdUrl: string = `api/products/${ownerId}`;
  
    this.repository.getData(ownerByIdUrl)
      .subscribe(res => {
        this.owner = res as product;
        this.ownerForm.patchValue(this.owner);
      
      },
      (error) => {

        alert(error);
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public updateOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerUpdate = (ownerFormValue) => {
 
    this.owner.productName = ownerFormValue.productName;
    this.owner.price = ownerFormValue.price;
    // this.owner.isDelete = ownerFormValue.address;
  
    let apiUrl = `api/products/${this.owner.productId}`;
    this.repository.update(apiUrl, this.owner)
      .subscribe(res => {
        alert("Successfull Updated")
        this.router.navigate(['/product/list']);
        // $('#successModal').modal();
      },
      (error => {
        alert("Error");
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }
  public redirectToProductList(){
    this.router.navigate(['product/list']);
  }

  public validateControl = (controlName: string) => {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;
  
    return false;
  }

  public hasError = (controlName: string, errorName: string)  => {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;
  
    return false;
  }

}
