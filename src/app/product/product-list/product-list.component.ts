import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { product } from 'src/app/shared/models/product.model';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,AfterViewInit {

  
  public products: product[];
  public isdelete:false;

  public displayedColumns = ['productId', 'productName', 'price', 'update', 'delete'];
  
  public dataSource = new MatTableDataSource<product>();
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  @ViewChild(MatSort,null) sort: MatSort;

  constructor(private repository: RepositoryService,private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Services Call Start Here
  public getAllProducts = () => {
    let apiAddress: string = "api/Products";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.dataSource.data=res as product[];
      this.products = res as product[];
    })
  }



public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/product/update/${id}`; 
    this.router.navigate([updateUrl]); 
}
public redirectToDeletePage = (id) => { 
  const deleteUrl: string = `/product/delete/${id}`; 
  this.router.navigate([deleteUrl]); 
}


public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
