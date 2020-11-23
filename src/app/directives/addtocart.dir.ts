import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
@Component({
  selector :'cart',
  template : `
  <div class="card text-center">
  <div class="card-header">
    Your Cart Items
    <button type="button" class="btn btn-sm btn-warning float-right">
        Total items <span class="badge badge-light">{{cart.cartItemsList.length}}</span>        
    </button>
    <button type="button" class="btn btn-sm btn-danger mr-2 float-right" (click)="emptyCart()" *ngIf="cart.cartItemsList && cart.cartTotal">
       Empty Cart       
    </button>
  </div>
  <div class="card-body">  
    <table class="table">
      <thead>
        <tr>      
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        
        </tr>
        <tr *ngFor="let itm of cart.cartItemsList ">      
          <td class="text-left">{{itm.name}}</td>
          <td>{{itm.price/itm.qty}} x</td>
          <td class="w30">
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-info" type="button" (click)="changeQty(itm.pid,1,'')">+</button>
              </div>
              <input type="text" class="form-control text-center" value="{{itm.qty}}" #qtyRef (keyup)="changeQty(itm.pid,qtyRef.value,'replace')" >
              <div class="input-group-append">
                <button class="btn btn-danger" type="button" (click)="changeQty(itm.pid,-1,'')">-</button>
              </div>
            </div>
          </td>
          <td>{{itm.price}}</td>
        </tr>
        </tbody>
    </table>
    <a routerLink = "/billing" class="btn btn-sm btn-primary" *ngIf="cart.cartItemsList && cart.cartTotal">Checkout</a>
  </div>
  <div class="card-footer text-muted font-weight-bold">
    Total : Rs. {{cart.cartTotal}}
  </div>  
</div>
  `,
  styles : [`
  .table td {
    vertical-align : unset;
    font-size:14px;
  }
  .w30{
    width: 35%;
  }
  `]
})

export class AddToCartDir{
  
  constructor(
    public cart: CartService
  ){
    
  }

  
  changeQty(pid,qty,replace){
    if(qty !== ''){
      qty=parseInt(qty) || 1;
      this.cart.addToCart(pid,qty,replace);
    }else{
      this.cart.addToCart(pid,1,replace);
    }
    
  }

  emptyCart(){
    let cartStatus = confirm("Are you sure you want to clear the cart ?");
    if(cartStatus){
      this.cart.emptyCart();
      document.location.href = '/products';
    }
  }

}