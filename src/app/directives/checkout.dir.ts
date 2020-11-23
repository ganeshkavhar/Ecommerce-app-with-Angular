import { Component,Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { StorageService } from '../services/storage.service';
import { CompanyDetailsModel } from '../model/companydetails.model';
@Component({
  selector : 'checkout-dir',
  template : ` 

 
   
   <div *ngIf="customerDetails && customerDetails.firstName;else emptyCheckout "> 
   <div class="alert alert-success d-print-none" role="alert">
    Thank you so much <strong>{{customerDetails.firstName}} {{customerDetails.lastName}}</strong>.Your order has been placed successfully and will be delivered in <strong>3 days.</strong> 
    <button class="btn btn-sm btn-info ml-2 mr-1" (click)="print()">Print Invoice</button><button class="btn btn-sm btn-info ml-1" (click)="clearCart()">Place a New Order</button>
    
   </div>
   
    <div class="card">
        <div class="card-header">
            Invoice Date:
            <strong>{{invoiceDate | date:'d-MMM-yyyy'}}</strong>
            <span class="float-right"> <strong>Status:</strong> Pending</span>

        </div>
        <div class="card-body">
        <div class="row">
          <div class="col-md-6 text-left">
          <img src="https://froggyads.com/blog/wp-content/uploads/2020/05/Understanding-E-Commerce-Types-and-Examples.jpg" class="logo mr-2 mb-4 float-left"/>
          </div>
          <div class="col-md-6 text-right">
          <h4># INV-{{invoiceNo}}</h4>
          </div>
        </div>
            <div class="row mb-4">
                <div class="col-sm-6">
                    <h6 class="mb-3">From:</h6>
                    <div>
                        <strong>{{companyDetails.name}}</strong>
                    </div>
                    <div>{{companyDetails.address}}</div>
                    <div>{{companyDetails.city}},{{companyDetails.pincode}}</div>
                    <div>Email: {{companyDetails.email}}</div>
                    <div>Phone: {{companyDetails.phone}}</div>
                </div>

                <div class="col-sm-6">
                    <h6 class="mb-3">To:</h6>
                    <div>
                        <strong>{{customerDetails.firstName}} {{customerDetails.lastName}}</strong>
                    </div>
                    <div>{{customerDetails.addressOne}}, {{customerDetails.addressTwo}}</div>
                    <div>{{customerDetails.city}},{{customerDetails.state}},{{customerDetails.zip}}</div>
                    <div>Email: {{customerDetails.email}}</div>
                    <div>Phone: {{customerDetails.mobile}}</div>
                </div>
            </div>

            <div class="table-responsive-sm">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="center">#</th>
                            <th>Item</th>
                            <th class="right">Unit Cost</th>
                            <th class="center">Qty</th>
                            <th class="right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor = "let cartItems of cart.cartItemsList;let i=index;">
                            <td class="center">{{i+1}}</td>
                            <td class="left strong">{{cartItems.name}}</td>
                            <td class="right">{{(cartItems.price/cartItems.qty)}}</td>
                            <td class="center">{{cartItems.qty}}</td>
                            <td class="right">{{cartItems.price}}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col-lg-4 col-sm-5">

                </div>

                <div class="col-lg-4 col-sm-5 ml-auto">
                    <table class="table table-clear">
                        <tbody>
                            <tr>
                                <td class="left">
                                    <strong>Subtotal</strong>
                                </td>
                                <td class="right">INR {{cart.cartTotal}}</td>
                            </tr>
                            
                            <tr>
                                <td class="left">
                                    <strong>Total</strong>
                                </td>
                                <td class="right">
                                    <strong>INR {{cart.cartTotal}}</strong>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                  
                </div>

            </div>

        </div>
    </div>
</div>
<ng-template #emptyCheckout> 
<div class="card alert alert-primary">
  <div class="card-body">
    Please shop some products & Provide billing information .<a class="btn btn-sm btn-info float-right ml-2" routerLink = '/products'> Continue Shopping</a> &nbsp;  &nbsp; <a class="btn btn-sm btn-info float-right" routerLink = '/billing' *ngIf="cart.cartItemsList && cart.cartTotal"> Go to Billing</a>
  </div>
</div>

   
   </ng-template>
  `,
  styles:[`
  .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: #cce5ff;
    border-bottom: 1px solid rgba(0,0,0,.125);
}
.logo{
      height: 100px;
      width: auto;
    }

  `]
})

export class CheckOutDir{
  public companyDetails: any ={};
  public customerDetails: any ={};
  public checkOutFlag: any ={};
  public invoiceDate: any = new Date();
  public invoiceNo: any = Math.floor(Math.random()*10000);
  
  @Input("allProductList") __allprdts: any = {};

  constructor(
    public cart: CartService,
    public storage: StorageService,
    public company: CompanyDetailsModel
  ){

  }

  ngOnInit(){
    this.customerDetails = this.cart.loadCheckoutInfo('customerInfo');
    this.companyDetails = this.company.companyInfo;
    this.cart.allItems = this.__allprdts;
    this.cart.listCartItems();
    this.checkOutFlag = JSON.parse(this.storage.get('mycart'));
  
  }
  clearCart(){
    let temp = {};
    localStorage.setItem(this.storage.storageName,JSON.stringify(temp));
    
    //this.checkOutFlag = Object.keys(this.storage.get()).length;
    //console.log(this.checkOutFlag)
    document.location.href='/products';
  }

  print(){
    let temp = {};
    localStorage.setItem(this.storage.storageName,JSON.stringify(temp));
window.focus();
window.print();
}
 
  
  
}