import { Component, Input, OnInit} from '@angular/core';
import { CustomerInfo } from 'src/app/models/customerInfo';

@Component({
  selector: 'app-check-out-confirmation',
  templateUrl: './check-out-confirmation.component.html',
  styleUrls: ['./check-out-confirmation.component.css']
})
export class CheckOutConfirmationComponent implements OnInit{
  @Input() customerInfo: CustomerInfo = {
    fullname: 'cong',
    address: '',
    creditCardNumber: '',
    orderPrice: 0
  }
  
  ngOnInit(): void {
  }

}
