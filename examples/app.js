'use strict';

/* dependencies */
const { include } = require('@lykmapipo/include');
const { get, start, mount } = require('@lykmapipo/express-common');
const { connect } = require('@lykmapipo/mongoose-common');
const { info, permissionRouter, roleRouter, partyRouter } = include(
  __dirname,
  '..'
);

// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) {
    throw error;
  }

  // expose module info
  get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // mount routers
  mount(permissionRouter, roleRouter, partyRouter);

  // fire the app
  start((error, env) => {
    // re-throw if error
    if (error) {
      throw error;
    }

    // start http server
    console.log(`visit http://0.0.0.0:${env.PORT}`);
  });
});
