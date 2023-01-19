import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDetail } from './models/PaymentDetail';

@Injectable()
export class AppService {
  private stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2022-11-15',
  });

  getHello(): string {
    return `Stripe Checkout Session API - ${process.env.npm_package_version}`;
  }

  async createSessionURL(body: PaymentDetail) {
    const YOUR_DOMAIN = 'http://localhost:4242';
    // create costumer on stripe
    const costumer = await this.stripe.customers.create({
      name: body.customerName,
      email: body.customerEmail,
      address: { line1: body.customerAddress },
    });

    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: body.price,
          quantity: 1,
        },
      ],
      customer: costumer.id,
      mode: body.mode || 'payment',
      metadata: {
        customer_name: body.customerName,
        customer_address: body.customerAddress,
      },
      billing_address_collection: process.env.BILLING_ADDRESS_COLLECTION
        ? 'required'
        : body.billingAddressCollection === 'required'
        ? 'required'
        : 'auto',
      success_url: process.env.SUCCESS_URL || `${YOUR_DOMAIN}/success.html`,
      cancel_url: process.env.CANCEL_URL || `${YOUR_DOMAIN}/cancel.html`,
    });

    return session.url;
  }
}
