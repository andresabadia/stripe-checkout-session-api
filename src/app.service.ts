import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDetail } from './models/PaymentDetail';

@Injectable()
export class AppService {
  private stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2022-11-15',
  });

  getHello(): string {
    return 'Stripe Checkout Session API';
  }

  async createSessionURL(body: PaymentDetail) {
    const YOUR_DOMAIN = 'http://localhost:4242';
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: body.price,
          quantity: 1,
        },
      ],
      mode: body.mode || 'payment',
      customer_email: body.customerEmail,
      metadata: {
        customer_name: body.customerName,
        customer_address: body.customerAddress,
      },
      success_url: process.env.SUCCESS_URL || `${YOUR_DOMAIN}/success.html`,
      cancel_url: process.env.CANCEL_URL || `${YOUR_DOMAIN}/cancel.html`,
    });

    return session.url;
  }
}
