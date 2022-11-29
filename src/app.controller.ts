import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentDetail } from './models/PaymentDetail';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-checkout-session')
  async createCheckoutSession(@Res() res, @Body() body: PaymentDetail) {
    const sessionURL = await this.appService.createSessionURL(body);
    return res.status(303).redirect(sessionURL);
  }
}
