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

* Save card
* Add router--link class [l]
* Add bank account form [m]
* Error messages for edit profile form [h]
* Develop for different screen sizes (tablet & mobile phones) [h]
* Add option for images on payments [m]

## SERVER TODO:

* Add password reset [l]
* Add Images to payment [l]
* Security of image size [m]
* Security of update & delete routes (refuse updating user parameters: id, email, password) [h]
* Abstracting routes (i.e. moving functions out when possible) [h]
