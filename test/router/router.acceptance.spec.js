const request = require('supertest');
const jwt = require('jsonwebtoken');

const SlimMomServer = require('../../api/server');
const UserModel = require('../../api/models/user.model');

const config = require('../../api/config');
const { jwtSecret } = config;

describe('\n\n Acceptance tests router', () => {
   let server;
   let token;
   let authorizationHeader;
   let createdUser;
   const invalidUserId = '5ff42f13b3aea86';
   const currentDate = new Date().toLocaleDateString('fr-ca');

   const testUser = {
      name: 'test',
      email: 'test@mail.com',
      password: 'password_hash',
   };

   before(async () => {
      server = new SlimMomServer().start();

      createdUser = await UserModel.create(testUser);

      const { _id } = createdUser;

      token = jwt.sign({ id: _id }, jwtSecret);

      await UserModel.updateAccessToken(_id, token);

      authorizationHeader = `Bearer ${token}`;
   });

   after(async () => {
      await UserModel.findByIdAndDelete(createdUser._id);

      server.close(() => {
         process.exit(0);
      });
      console.log('\x1b[35m%s\x1b[0m', 'Server stopped');
   });

   describe('\n Acceptance tests daily-rate.router', () => {
      const badBody = {
         //  weight: 90,
         height: 170,
         age: 35,
         desiredWeight: 60,
         bloodType: 3,
      };

      const goodBody = {
         weight: 90,
         height: 170,
         age: 35,
         desiredWeight: 60,
         bloodType: 3,
      };

      describe('POST /daily-rate', () => {
         it('should return 404 Error: Invalid data', async () => {
            const res = await request(server)
               .post('/daily-rate')
               .set('Content-Type', 'application/json')
               .send(badBody)
               .expect(404);
         });

         it('should return the status 200', async () => {
            const res = await request(server)
               .post('/daily-rate')
               .set('Content-Type', 'application/json')
               .send(goodBody)
               .expect(200);

            const resBody = res.body;

            resBody.should.have.property('dailyRate').be.equal(1326.5).which.is.a.Number();
            resBody.should.have.property('notAllowedProducts').which.is.a.Array();
         });
      });

      describe('POST /daily-rate/:userId', () => {
         it('should return 401 Error: User not authorized', async () => {
            const res = await request(server)
               .post(`/daily-rate/${createdUser._id}`)
               .set('Content-Type', 'application/json')
               .set('Authorization', '')
               .send(goodBody)
               .expect(401);
         });

         context('when user authorized', () => {
            it('should return 404 Error: Invalid data', async () => {
               const res = await request(server)
                  .post(`/daily-rate/${createdUser._id}`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', authorizationHeader)
                  .send(badBody)
                  .expect(404);
            });

            it('should return 404 Error: Invalid id', async () => {
               const res = await request(server)
                  .post(`/daily-rate/${invalidUserId}`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', authorizationHeader)
                  .send(goodBody)
                  .expect(404);
            });

            it('should return the status 200', async () => {
               const res = await request(server)
                  .post(`/daily-rate/${createdUser._id}`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', authorizationHeader)
                  .send(goodBody)
                  .expect(200);

               const resBody = res.body;

               resBody.should.have.property('_id').which.is.a.String();
               resBody.should.have.property('date').be.equal(currentDate).which.is.a.String();
               resBody.should.have.property('daySummary').which.is.a.Object();
               resBody.should.have.property('eatenProducts').which.is.a.Array();
               resBody.should.have.property('notAllowedProducts').which.is.a.Array();

               const daySummary = resBody.daySummary;

               daySummary.should.have.property('kcalLeft').be.equal(1326.5).which.is.a.Number();
               daySummary.should.have.property('kcalConsumed').be.equal(0).which.is.a.Number();
               daySummary.should.have.property('dailyRate').be.equal(1326.5).which.is.a.Number();
               daySummary.should.have
                  .property('percentsOfDailyRate')
                  .be.equal(0)
                  .which.is.a.Number();
            });
         });
      });
   });

   describe('\n Acceptance tests product.router', () => {
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
});
