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

* No SEO, no meta tags

## APP TODO:

* Add router--link class
* Add bank account form
* Error messages for edit profile form
* Develop for different screen sizes (tablet & mobile phones)
* Add sharing luvs by email
* Add option for images on payments

## SERVER TODO:

* Security of registering multiple emails
* Add password reset
* Add Images to payment
* Security of image size
* Security of update & delete routes (refuse updating user parameters: id, email, password)
* Abstracting routes (i.e. moving functions out when possible)
