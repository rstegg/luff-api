# luvpay

## Now with App & Server!

## Running production:

`cd app && npm run build && mv build ../ && cd .. && npm i && npm start` (fix this shit)

## Running development

`npm start --PORT=1337`
`cd app`
`npm start`
(also fix this shit)

## General TODO:

* Add tests (PRIORITY)

## Bugs:

* Screen sizes are gay
* Profile grows too big

## APP TODO:

* Develop for different screen sizes (tablet & mobile phones)
* Add email confirmation
* Move stripe in
* Add sharing stubs by email
* Add option for images on stubs and payments
* Move shit off the CRA crutch (low priority)

## SERVER TODO:
* Refactoring of routes
* Security of update & delete routes (refuse updating user parameters: id, email, password)
* Security of image size
* Add password reset
* Add Stripe
* Add Images
