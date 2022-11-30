# Stripe Checkout Session API

## Description

API to selfhost the stripe checkout session. Use this together with the [Stripe API key](https://dashboard.stripe.com/test/apikeys) and [price ID of your product](https://dashboard.stripe.com/test/products).

## Host with Docker

Use the [docker image](https://hub.docker.com/r/andresabadia/stripe-checkout-session-api) to run host the application with Docker.

```bash
$ docker run andresabadia/stripe-checkout-session-api -p 3000:3000
```

or use the `docker-compose.yml` to run. Don't forget to create the `.env` files with the enviroment variables.

## Enviroment variables

There are several env variables needed for the project to run correctly.

| key            | description                                                                                            | isRequired | default                            |
| -------------- | ------------------------------------------------------------------------------------------------------ | ---------- | ---------------------------------- |
| STRIPE_API_KEY | The Stripe api key. Retrieve this in the Stripe [dashboard](https://dashboard.stripe.com/test/apikeys) | yes        | -                                  |
| SUCCESS_URL    | url to redirect after the payment has been successful                                                  | no         | http://localhost:4242/success.html |
| CANCEL_URL     | url to redirect, if the user cancels the payment process                                               | no         | http://localhost:4242/cancel.html  |

## Route and Body structure

In order to generate the checkout URL some payloads are required in the body of the POST request.

### Route

```
{domain}/create-checkout-session
```

### Body

```ts
interface PaymentDetail {
  price: string;
  mode: 'payment' | 'setup' | 'subscription';
  customerEmail?: string;
  customerName?: string;
  customerAddress?: string;
}
```

## Development

### Installation

```bash
$ npm run install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Build Docker Image

```bash
npm run docker:build
# or use your own docker image name and tag
docker build -t {image_name}:{image_tag} .
```
