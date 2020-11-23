import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
@Component({
  selector :'billing-cart',
  template : `
  <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-warning badge-pill">{{cart.cartItemsList.length}}</span>
          </h4>
          <ul class="list-group mb-3">
            <li 
            class="list-group-item d-flex justify-content-between lh-condensed"
             *ngFor="let itm of cart.cartItemsList "
            >
              <div>
                <h6 class="">{{itm.name}} -   <span class="badge badge-pill badge-info text-right">{{itm.qty}}  Nos</span> x <span class="badge badge-pill badge-default text-right">{{itm.price/itm.qty}}  </span></h6>                
              </div>
              <span class="text-muted">{{itm.price}}</span>
            </li>
            
            
            <li class="list-group-item d-flex justify-content-between bg-light">
              <span>Total (INR)</span>
              <strong>{{cart.cartTotal}}</strong>
            </li>
          </ul>

         
  `,
  styles : [`
  .table td {
    vertical-align : unset;
  }
  .w30{
    width: 35%;
  }
  `]
})

export class BillingCartDir{
  
  
  constructor(
    public cart: CartService
  ){
    
  }

  

}