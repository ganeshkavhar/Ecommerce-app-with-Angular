import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { emailValidation,len,numeric } from '../validations/custom.validate';

@Injectable()
export class BillingFormModel{
  
  public data : any = [
    {
      label : 'First Name',
      placeholder : 'First Name',
      uid: 'firstName',
      type: 'text',
      value: '',
      validation : [ Validators.required ],
      errorMsg : 'Please enter first name' 
    },
    {
      label : 'Last Name',
      placeholder : 'Last Name',
      uid: 'lastName',
      type: 'text',
      value: '',
      validation : [ Validators.required ],
      errorMsg : 'Please enter last name'
    },
    {
      label : 'Email',
      placeholder : 'Email',
      uid: 'email',
      type: 'text',
      value: '',
      validation : [ Validators.required , emailValidation() ],
      errorMsg : 'Please enter email'
    },
    {
      label : 'Mobile',
      placeholder : 'Mobile',
      uid: 'mobile',
      type: 'text',
      value: '',
      validation : [ Validators.required,len(10),numeric()],
      errorMsg : 'Please enter mobile no' 
    },
    {
      label : 'Address 1',
      placeholder : 'Address 1',
      uid: 'addressOne',
      type: 'text',
      value: '',
      validation : [ Validators.required],
      errorMsg : 'Please enter address one'
    },
    {
      label : 'Address 2',
      placeholder : 'Address 2',
      uid: 'addressTwo',
      type: 'text',
      value: '',
      validation : [ Validators.required],
      errorMsg : 'Please enter address two'
    },
    {
      label : 'City',
      placeholder : 'City',
      uid: 'city',
      type: 'text',
      value: '',
      validation : [ Validators.required],
      errorMsg : 'Please enter city' 
    },
    {
      label : 'State',
      placeholder : 'State',
      uid: 'state',
      type: 'select',
      value: '',
      validation : [Validators.required] ,
      options : [ 'Tamil Nadu','Andhra Pradesh','Karnataka' ],
      errorMsg : 'Please enter state'
    },
    {
      label : 'Zip Code',
      placeholder : 'Zip Code',
      uid: 'zip',
      type: 'text',
      value: '',
      validation : [ Validators.required],
      errorMsg : 'Please enter zipcode' 
    },
    {
      label : 'Payment Mode',
      placeholder : 'Payment Mode',
      uid: 'paymentmode',
      type: 'select',
      value: '',
      validation : [Validators.required] ,
      options : [ 'COD','UPI' ],
      errorMsg : 'Please enter payment mode'
    },
  ]
} 