import Stripe from 'stripe';

export interface PaymentDetail {
  price: string;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
  customerEmail?: string;
  customerName?: string;
  customerAddress?: string;
}
