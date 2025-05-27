// payment-validator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentValidatorService {
  validateCard(cardNumber: string): boolean {
    return cardNumber.startsWith('4'); 
  }
}
