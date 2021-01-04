const request = require('supertest');

const SlimMomServer = require('../../api/server');

describe('Acceptance test product.router', () => {
   let server;
   let token;
   let authorizationHeader;
   let userTest;

   before(() => {
      server = new SlimMomServer().start();
   });

   after(() => {
      server.close(() => {
         process.exit(0);
      });
      console.log('\x1b[35m%s\x1b[0m', 'Server stopped');
   });

   describe('GET /product', () => {
      it('should return 401 Error: User not authorized', async () => {
         const result = await request(server)
            .get('/product')
            .set('Content-Type', 'application/json')
            .set('Authorization', '')
            .send({})
            .expect(500);
         console.log(result);
      });
   });
});
