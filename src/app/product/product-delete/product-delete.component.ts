import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/models/product.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  public owner: product;
 
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute) { }

    ngOnInit() {
      this.getOwnerById();
    }
    
    private getOwnerById = () => {
      const ownerId: string = this.activeRoute.snapshot.params['id'];
      const ownerByIdUrl: string = `api/products/${ownerId}`;
    
      this.repository.getData(ownerByIdUrl)
        .subscribe(res => {
          this.owner = res as product;
        },
        (error) => {
         alert("Error")
        })
    }
    
    public redirectToOwnerList = () => {
      this.router.navigate(['/product/list']);
    }

    public deleteOwner = () => {
      const deleteUrl: string = `api/products/${this.owner.productId}`;
      this.repository.delete(deleteUrl)
        .subscribe(res => {
          alert("successfully Deleted")
          this.redirectToOwnerList()
        },
        (error) => {
         alert("Error")
        })
    }

}
