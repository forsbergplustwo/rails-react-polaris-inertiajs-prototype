# README

This is a prototype Rails 6.0 application which uses Inertia.js to work with React and Shopify Polaris.

Suprisingly, I quite like it! [Inertia.js](https://inertiajs.com/who-is-it-for) really does become the glue between rails and react in a simple and understandable way.

To install:

1. Clone this repo
2. Run `bundle install` and `yarn install`
3. Setup the DB: `rails db:create && rails db:migrate && rails db:seed`. This adds a couple of Order records for use in the prototype.
4. Now you should be able to run `rails s` and navigate to `https://localhost:3000`
