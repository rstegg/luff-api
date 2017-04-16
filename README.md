# luvpay

## Now with App & Server!

## Running production:

`cd app && npm run build` (to build app)
`npm run staging` (to update app without restarting server)
`npm i && npm start` (to start server)

## Running development

`cd app && npm start` (starts at localhost:3000)

## General TODO:

* Setup development and production building
* Add tests (PRIORITY)

## Bugs:

* Screen sizes are gay
* Profile grows too big

## APP TODO:

* Develop for different screen sizes (tablet & mobile phones)
* Move stripe in
* Add sharing stubs by email
* Add option for images on stubs and payments
* Move off CRA scripts (they work, low priority)

## SERVER TODO:
* Refactoring of routes
* Security of update & delete routes (refuse updating user parameters: id, email, password)
* Security of image size
* Add password reset
* Add Stripe
* Add Images
