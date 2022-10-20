### Hello future colleagues!

This mini-coding challenge is meant for you to showcase your experience with ExpressJS, NodeJS and MongoDB. It is recommended that you use a free instance of MongoDB (https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/) for this exercise.

Presented here is a simple, outdated, CRUD application that serves the front end application: https://ttc-coding-challenge-d641d.web.app/

For this exercise, you are required to:

- [ ] Add the ability to mark a particular notification as read based on `_id`
- [ ] Retrieve an individual notification based on `_id`
- [ ] Refactor this application to modernize the server architecture, using your current best practices and knowledge. For this you are not limited in scope of what to improve, do what you feel is best.

This exercise is to take at most 3 hour of development time.

To help you on this task, we have included the SwaggerDocs UI being served from the `/` route: `http://localhost:3000/` and a function to seed
notifications in the database `npm run seed`

> Note: StackBlitz web-container does not currently support connections to MongoDB, so you must clone the project locally to run it.

### Configure

1. Update `config/local.json` and set `MONGO_HOST` to be the connection string for your mongodb server (eg. starting with `mongodb+srv://`)

### Running

- To seed your database with notifications: `npm run seed`
- To generate the swagger docs: `npm run swagger`
- To run the server (with nodemon): `npm run start`
  - The server will come up on `http://localhost:3000`

### Questions

Any questions can be sent to Andrew at `awright@tenthousandcoffees.com` or Cherifta at `cherifta@tenthousandcoffees.com`
