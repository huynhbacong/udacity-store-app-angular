import { Component, Output, Input, EventEmitter} from '@angular/core';
import { CustomerInfo } from 'src/app/models/customerInfo';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.css']
})
export class CustomerInfoFormComponent {
  customerInfo: CustomerInfo = {
    fullname: '',
    address: '',
    creditCardNumber: '',
    orderPrice: 0
  }
  @Input() submitDisabled: boolean = false;

  @Output() submitInfo = new EventEmitter<CustomerInfo>()

  onSubmit() {
    this.submitInfo.emit(this.customerInfo);
  }
}
