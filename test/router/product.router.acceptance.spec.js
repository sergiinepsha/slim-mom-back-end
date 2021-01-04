const request = require('supertest');
const jwt = require('jsonwebtoken');

const SlimMomServer = require('../../api/server');
const UserModel = require('../../api/models/user.model');

const config = require('../../api/config');
const { jwtSecret } = config;

describe('Acceptance test product.router', () => {
   let server;
   let token;
   let authorizationHeader;

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
         await request(server)
            .get('/product')
            .set('Content-Type', 'application/json')
            .set('Authorization', '')
            .send({})
            .expect(401);
      });

      context('when user authorized', () => {
         const testUser = {
            name: 'test',
            email: 'test@mail.com',
            password: 'password_hash',
         };

         let createdUser;

         before(async () => {
            createdUser = await UserModel.create(testUser);

            const { _id } = createdUser;

            token = jwt.sign({ id: _id }, jwtSecret);

            await UserModel.updateAccessToken(_id, token);

            authorizationHeader = `Bearer ${token}`;
         });

         after(async () => {
            await UserModel.findByIdAndDelete(createdUser._id);
         });

         it('should return the status 200 and an array of all products', async () => {
            const res = await request(server)
               .get('/product')
               .query({ search: '' })
               .set('Content-Type', 'application/json')
               .set('Authorization', authorizationHeader)
               .send({})
               .expect(200);

            res.body.length.should.be.equal(2648);
         });

         it('should return the status 200 and an array of products', async () => {
            const res = await request(server)
               .get('/product')
               .query({ search: 'квас' })
               .set('Content-Type', 'application/json')
               .set('Authorization', authorizationHeader)
               .send({})
               .expect(200);

            const resBody = res.body;

            resBody[0].title.should.have
               .property('ru')
               .be.equal('Квас хлебный')
               .which.is.a.String();

            resBody[0].should.have
               .property('_id')
               .be.equal('5d51694902b2373622ff5ef2')
               .which.is.a.String();

            resBody[0].should.have.property('weight').be.equal(100).which.is.a.Number();

            resBody[0].should.have.property('calories').be.equal(27).which.is.a.Number();
         });
      });
   });
});
