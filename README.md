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
* Redux is logging to console (disable redux inspector on production)
* No SEO, no meta tags

## APP TODO:

* Develop for different screen sizes (tablet & mobile phones)
* Move stripe in
* Add sharing stubs by email
* Add option for images on stubs and payments
* Move off CRA scripts (they work, low priority)

## SERVER TODO:
* Add password reset
* Add Images to stub & payment
* Security of image size
* Security of update & delete routes (refuse updating user parameters: id, email, password)
* Add Stripe
* Abstracting routes (i.e. moving functions out when possible)
