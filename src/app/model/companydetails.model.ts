import { Injectable } from '@angular/core';

@Injectable()
export class CompanyDetailsModel{
  
  public companyInfo : any = 
    {
      name : 'Trend Shopping',
      address : 'No: 12,OMR Road',
      city: 'Chennai',
      pincode: '600045',
      email: 'customer.care@a2zshoppee.com',
      phone : '044-43232123'
    }
    
  
} 