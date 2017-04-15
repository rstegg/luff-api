# luvpay

## Now with App & Server!

## Running production:

`cd app && npm run build && mv build ../ && cd .. && npm i && npm start` (fix this shit)

## Running development

`npm start --PORT=1337`
`cd app`
`npm start`
(also fix this shit)

## APP TODO:

* Move shit off the CRA crutch
* Fix presentation shit
* Move stripe in
* Add email confirmation
* Add sharing stubs by email
* Add option for images on stubs and payments

## SERVER TODO:
* Refactoring of routes
* Security of update & delete routes (refuse updating user parameters: id, email, password)
* Security of image size
* Add password reset
* Add Stripe
* Add Images
