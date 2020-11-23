import { Component,Input,Output } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CartService } from '../services/cart.service';
import { FormBuilder } from '@angular/forms';
//import { emailValidation } from '../validations/custom.validate';
@Component({
  selector : 'billing-dir',
  template : `
      <form [formGroup]="billingForm" (ngSubmit) = "send()">
      
      <div class="form-row">

          <div class="form-group col-md-6" *ngFor="let formFields of __billing">
             
            <label for="inputEmail4">{{formFields.label}}</label>
            <div *ngIf="formFields.type=='text'">
            <input 
            type="text" 
            class="form-control" 
            formControlName="{{formFields.uid}}"
            placeholder="{{formFields.placeholder}}" />

            <small 
            class="form-text text-danger" 
            *ngIf="billingForm.controls[formFields.uid].status=='INVALID' && billingForm.controls[formFields.uid].touched"
            >{{formFields.errorMsg}}</small></div>

            <div *ngIf="formFields.type=='select'">
              <select id="inputState" class="form-control" formControlName = "{{formFields.uid}}">
                <option>Select</option>
                <option *ngFor="let optionName of formFields.options" value="{{optionName}}">{{optionName}}</option>
              </select>
              <small class="form-text text-danger" 
            *ngIf="billingForm.controls[formFields.uid].status=='INVALID' && billingForm.controls[formFields.uid].touched"
            >{{formFields.errorMsg}}</small>
            </div>
          </div>
                 
      </div>
    <button type="submit" class="btn btn-sm btn-primary" [disabled]="billingForm.invalid" *ngIf="cart.cartItemsList && cart.cartTotal">Confirm and Place Order</button>
    <a routerLink="/products" class="btn btn-sm btn-info float-right">Continue Shopping</a>
  
</form>
  `,
  styles: [`
  form .ng-invalid.ng-touched{
    border-color: #dc3545;
  }
  `]
})

export class BillingDir{
  public billingForm: any = {};
  public errorsInfo: any = {};
  @Input('billingFields') __billing: any = {};

  constructor(
    public fb:FormBuilder,
    public storage:StorageService,
    public cart:CartService,
  ){

  }

  ngOnInit(){ 
  this.loadForm();
}

loadForm(){
   let temp = {};
   let billingInfo=this.cart.loadCheckoutInfo('customerInfo');
   if(billingInfo === undefined || billingInfo ==='' || billingInfo === null){
      billingInfo = {}; 
    }
   (this.__billing).forEach( (item) => {
     
     temp[ item.uid ] = [ billingInfo[item.uid] , item.validation ];
     
   } );

  this.billingForm = this.fb.group(temp);

}


send(){  
  if(this.billingForm.valid){
    
    this.storage.set({
      customerInfo:this.billingForm.value
    })
    document.location.href="/checkout";
  }
}
}