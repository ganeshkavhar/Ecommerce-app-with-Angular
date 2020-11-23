import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsModel } from '../../model/products.model';

@Component({
  template:`
 <menu></menu>
  <div class="container">
    
    <div class="form-row align-items-center">    
      <div class="col-md-9">     
        <div class="input-group mb-4 mt-2">
          <div class="input-group-prepend">
            <div class="input-group-text">Search Products</div>
          </div>
          <input [(ngModel)] = "searchText" class="form-control" placeholder="Please enter any product name to search ">
        </div>
      </div>
      <div class="col-md-3">     
        <div class=" mb-4 mt-2"> 
          <select class="form-control"  [(ngModel)] = "sortOption">        
        <option value="product_name|asc">Sort By Name (A to Z)</option>
        <option value="product_name|desc">Sort By Name (Z to A)</option>
        <option value="product_price|lth">Sort By Price (Low to High)</option>
        <option value="product_price|htl">Sort By Price (High to Low)</option>
      </select>
        </div>
      </div>
      
          
  </div>
    <div class="row">
      <div class="col-md-7">  
        <productslist-dir 
         (refresh)="ref($event)"
         [allProductList]="products.data"
         [searchedText]="searchText"
         [sortingBy]="sortOption"
         ></productslist-dir>
      </div>
      <div class="col-md-5">
        <cart 
        *ngIf="cartflag"        
        ></cart>
      </div>
    </div>
    
  
  </div>
  `
})

export class ProductsPage{
    public cartflag:boolean= false;
    public sortBy: string ='';
    public sortOption: string ='product_name|asc';
  constructor (
    public products:ProductsModel
    
    ){

  }
  ngOnInit(){
    this.ref();
  }
  ref(){
    this.cartflag = false;
    setTimeout( () => {
        this.cartflag = true;
    }, 10 )
  }
  

}