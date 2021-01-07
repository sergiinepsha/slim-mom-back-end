'use strict';

const request = require('supertest');
const jwt = require('jsonwebtoken');

const SlimMomServer = require('../../api/server');
const userModel = require('../../api/models/user.model');
const dayModel = require('../../api/models/day.model');

const config = require('../../api/config');
const { jwtSecret } = config;

describe('\n\n Acceptance tests router', () => {
   let server;
   let authorizationHeader;

   const testUser = {
      name: 'test',
      email: 'test@mail.com',
      password: 'password_hash',
   };

   before(async () => {
      server = new SlimMomServer().start();
   });

   after(async () => {
      const { email } = testUser;

      const { days } = await userModel.findOneAndDelete({ email });

      await dayModel.findByIdAndDelete(days[0].id);

      server.close(() => {
         process.exit(0);
      });
      console.log('\x1b[35m%s\x1b[0m', 'Server stopped');
   });

   describe('\n Acceptance tests auth.router', () => {
      describe('POST /auth/register', () => {
         it('should return 400 Error: Incorrect email or too short', async () => {
            await request(server)
               .post('/auth/register')
               .set('Content-Type', 'application/json')
               .send({ name: 'test', email: 'mail', password: 'password_hash' })
               .expect(400);
         });

         it('should return 400 Error: Incorrect name or too short', async () => {
            await request(server)
               .post('/auth/register')
               .set('Content-Type', 'application/json')
               .send({ name: 25, email: 'test@mail.com', password: 'password_hash' })
               .expect(400);
         });

         it('should return 400 Error: Incorrect password or too short', async () => {
            await request(server)
               .post('/auth/register')
               .set('Content-Type', 'application/json')
               .send({ name: 'test', email: 'test@mail.com', password: '' })
               .expect(400);
         });

         it('should return the status 201', async () => {
            await request(server)
               .post('/auth/register')
               .set('Content-Type', 'application/json')
               .send({ name: 'test', email: 'test@mail.com', password: 'password_hash' })
               .expect(201);
         });
      });

      describe('POST /auth/login', () => {
         it('should return 401 Error: Incorrect email', async () => {
            await request(server)
               .post('/auth/login')
               .set('Content-Type', 'application/json')
               .send({ email: 'mail', password: 'password_hash' })
               .expect(401);
         });

         it('should return 401 Error: Incorrect password', async () => {
            await request(server)
               .post('/auth/login')
               .set('Content-Type', 'application/json')
               .send({ email: 'test@mail.com', password: '' })
               .expect(401);
         });

         it('should return the status 201', async () => {
            const res = await request(server)
               .post('/auth/login')
               .set('Content-Type', 'application/json')
               .send({ email: 'test@mail.com', password: 'password_hash' })
               .expect(201);

            const resBody = res.body;

            resBody.should.have.property('accessToken').which.is.a.String();
            resBody.should.have.property('refreshToken').which.is.a.String();
            resBody.should.have.property('sid').which.is.a.String();
            resBody.should.have.property('user').which.is.a.Object();

            const user = resBody.user;

            user.should.have.property('_id').which.is.a.String();
            user.should.have.property('name').be.equal(testUser.name).which.is.a.String();
            user.should.have.property('email').be.equal(testUser.email).which.is.a.String();

            user.should.have.property('userData').which.is.a.Object();

            const userData = user.userData;

            userData.should.have.property('weight').be.equal(0).which.is.a.Number();
            userData.should.have.property('height').be.equal(0).which.is.a.Number();
            userData.should.have.property('age').be.equal(0).which.is.a.Number();
            userData.should.have.property('desiredWeight').be.equal(0).which.is.a.Number();
            userData.should.have.property('bloodType').be.equal(1).which.is.a.Number();
            userData.should.have.property('dailyRate').be.equal(0).which.is.a.Number();
         });
      });

      describe('POST /auth/logout', () => {
         it('should return 401 Error: User not authorized', async () => {
            await request(server)
               .post(`/auth/logout`)
               .set('Content-Type', 'application/json')
               .set('Authorization', '')
               .send({})
               .expect(401);
         });

         context('when user authorized', () => {
            before(async () => {
               const { email } = testUser;

               const { accessToken } = await userModel.findOne({ email });

               authorizationHeader = `Bearer ${accessToken}`;
            });

            it('should return the status 204', async () => {
               await request(server)
                  .post(`/auth/logout`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', authorizationHeader)
                  .send({})
                  .expect(204);
            });
         });
      });
   });

   context('when user created', () => {
      let token;
      let createdUser;

      const currentDate = new Date().toLocaleDateString('fr-ca');

      const goodBodyDailyRate = {
         weight: 90,
         height: 170,
         age: 35,
         desiredWeight: 60,
         bloodType: 3,
      };

      before(async () => {
         const { email } = testUser;

         createdUser = await userModel.findOne({ email });

         const { _id } = createdUser;

         token = jwt.sign({ id: _id }, jwtSecret);

         await userModel.updateAccessToken(_id, token);

         authorizationHeader = `Bearer ${token}`;
      });

      describe('\n Acceptance tests daily-rate.router', () => {
         const badBody = {
            //  weight: 90,
            height: 170,
            age: 35,
            desiredWeight: 60,
            bloodType: 3,
         };

         const invalidUserId = '5ff42f13b3aea86';

         describe('POST /daily-rate', () => {
            it('should return 404 Error: Invalid data', async () => {
               await request(server)
                  .post('/daily-rate')
                  .set('Content-Type', 'application/json')
                  .send(badBody)
                  .expect(404);
            });

            it('should return the status 200 and data object', async () => {
               const res = await request(server)
                  .post('/daily-rate')
                  .set('Content-Type', 'application/json')
                  .send(goodBodyDailyRate)
                  .expect(200);

               const resBody = res.body;

               resBody.should.have.property('dailyRate').be.equal(1326.5).which.is.a.Number();
               resBody.should.have.property('notAllowedProducts').which.is.a.Array();
            });
         });

         describe('POST /daily-rate/:userId', () => {
            it('should return 401 Error: User not authorized', async () => {
               await request(server)
                  .post(`/daily-rate/${createdUser._id}`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', '')
                  .send(goodBodyDailyRate)
                  .expect(401);
            });

            context('when user authorized', () => {
               it('should return 404 Error: Invalid data', async () => {
                  await request(server)
                     .post(`/daily-rate/${createdUser._id}`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(badBody)
                     .expect(404);
               });

               it('should return 404 Error: Invalid id', async () => {
                  await request(server)
                     .post(`/daily-rate/${invalidUserId}`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(goodBodyDailyRate)
                     .expect(404);
               });

               it('should return the status 200 and data object', async () => {
                  const res = await request(server)
                     .post(`/daily-rate/${createdUser._id}`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(goodBodyDailyRate)
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

      describe('\n Acceptance tests day.router', () => {
         describe('POST /day', () => {
            let dayId;

            const productId = '5d51694802b2373622ff552d';

            const goodBody = {
               date: currentDate,
               productId,
               weight: 200,
            };

            const bodyWithBadDate = {
               date: null,
               productId: '5d51694802b2373622ff552d',
               weight: 200,
            };

            const bodyWithBadProductId = {
               date: currentDate,
               productId: '5d51694802',
               weight: 200,
            };

            it('should return 401 Error: User not authorized', async () => {
               await request(server)
                  .post(`/day`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', '')
                  .send(goodBody)
                  .expect(401);
            });

            context('when user authorized', () => {
               it('should return 404 Error: Invalid request body', async () => {
                  await request(server)
                     .post(`/day`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(bodyWithBadDate)
                     .expect(404);
               });

               it('should return 404 Error: Invalid id', async () => {
                  await request(server)
                     .post(`/day`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(bodyWithBadProductId)
                     .expect(404);
               });

               it('should return the status 201 and data object', async () => {
                  const res = await request(server)
                     .post(`/day`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(goodBody)
                     .expect(201);

                  const resBody = res.body;

                  resBody.should.have.property('_id').which.is.a.String();
                  resBody.should.have.property('date').be.equal(currentDate).which.is.a.String();
                  resBody.should.have.property('daySummary').which.is.a.Object();
                  resBody.should.have.property('eatenProducts').which.is.a.Array();
                  resBody.should.have.property('notAllowedProducts').which.is.a.Array();

                  const daySummary = resBody.daySummary;

                  daySummary.should.have.property('kcalLeft').be.equal(958.5).which.is.a.Number();
                  daySummary.should.have.property('kcalConsumed').be.equal(368).which.is.a.Number();
                  daySummary.should.have.property('dailyRate').be.equal(1326.5).which.is.a.Number();
                  daySummary.should.have
                     .property('percentsOfDailyRate')
                     .be.equal(27.742178665661516)
                     .which.is.a.Number();

                  const eatenProducts = resBody.eatenProducts;

                  eatenProducts[0].should.have.property('_id').which.is.a.String();
                  eatenProducts[0].should.have
                     .property('title')
                     .be.equal('Омлет')
                     .which.is.a.String();
                  eatenProducts[0].should.have.property('weight').be.equal(200).which.is.a.Number();
                  eatenProducts[0].should.have.property('kcal').be.equal(368).which.is.a.Number();
               });
            });
         });

         describe('DELETE /day', () => {
            context('when user created', () => {
               let currentUser;
               let currentDay;
               const goodBody = {};
               const bodyWithBadDate = { dayId: 10057, eatenProductId: 900212 };
               const bodyWithBadDayId = { dayId: '10057' };
               const bodyWithBadProductId = { eatenProductId: '900212' };

               before(async () => {
                  const { _id } = createdUser;

                  currentUser = await userModel.findById(_id);

                  const dayId = currentUser.days[0].id;

                  currentDay = await dayModel.findById(dayId);

                  const eatenProductId = currentDay.eatenProducts[0]._id;

                  goodBody.dayId = dayId;
                  goodBody.eatenProductId = eatenProductId;

                  bodyWithBadDayId.eatenProductId = eatenProductId;

                  bodyWithBadProductId.dayId = dayId;
               });

               it('should return 401 Error: User not authorized', async () => {
                  await request(server)
                     .delete(`/day`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', '')
                     .send(goodBody)
                     .expect(401);
               });

               context('when user authorized', () => {
                  it('should return 404 Error: Invalid request body', async () => {
                     await request(server)
                        .delete(`/day`)
                        .set('Content-Type', 'application/json')
                        .set('Authorization', authorizationHeader)
                        .send(bodyWithBadDate)
                        .expect(404);
                  });

                  it('should return 404 Error: Invalid id, bodyWithBadDayId', async () => {
                     await request(server)
                        .delete(`/day`)
                        .set('Content-Type', 'application/json')
                        .set('Authorization', authorizationHeader)
                        .send(bodyWithBadDayId)
                        .expect(404);
                  });

                  it('should return 404 Error: Invalid id, bodyWithBadProductId', async () => {
                     await request(server)
                        .delete(`/day`)
                        .set('Content-Type', 'application/json')
                        .set('Authorization', authorizationHeader)
                        .send(bodyWithBadProductId)
                        .expect(404);
                  });

                  it('should return the status 201 and data object', async () => {
                     const res = await request(server)
                        .delete(`/day`)
                        .set('Content-Type', 'application/json')
                        .set('Authorization', authorizationHeader)
                        .send(goodBody)
                        .expect(201);

                     const resBody = res.body;

                     resBody.should.have.property('kcalLeft').be.equal(1326.5).which.is.a.Number();
                     resBody.should.have.property('kcalConsumed').be.equal(0).which.is.a.Number();
                     resBody.should.have.property('dailyRate').be.equal(1326.5).which.is.a.Number();
                     resBody.should.have
                        .property('percentsOfDailyRate')
                        .be.equal(0)
                        .which.is.a.Number();
                  });
               });
            });
         });

         describe('POST /day/info', () => {
            const goodBody = {
               date: currentDate,
            };

            const bodyWithBadDate = {
               date: 'date',
            };

            it('should return 401 Error: User not authorized', async () => {
               await request(server)
                  .post(`/day/info`)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', '')
                  .send(goodBody)
                  .expect(401);
            });

            context('when user authorized', () => {
               it('should return 404 Error: Invalid request body', async () => {
                  await request(server)
                     .post(`/day/info`)
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send(bodyWithBadDate)
                     .expect(404);
               });

               it('should return the status 200 and data object', async () => {
                  const res = await request(server)
                     .post(`/day/info`)
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

      describe('\n Acceptance tests user.router', () => {
         describe('GET /user', () => {
            it('should return 401 Error: User not authorized', async () => {
               await request(server)
                  .get('/user')
                  .set('Content-Type', 'application/json')
                  .set('Authorization', '')
                  .send({})
                  .expect(401);
            });

            context('when user authorized', () => {
               it('should return the status 200 and user info', async () => {
                  const res = await request(server)
                     .get('/user')
                     .set('Content-Type', 'application/json')
                     .set('Authorization', authorizationHeader)
                     .send({})
                     .expect(200);

                  const resBody = res.body;

                  resBody.should.have.property('_id').which.is.a.String();
                  resBody.should.have.property('name').be.equal(testUser.name).which.is.a.String();
                  resBody.should.have
                     .property('email')
                     .be.equal(testUser.email)
                     .which.is.a.String();
                  resBody.should.have.property('accessToken').be.equal(token).which.is.a.String();
                  resBody.should.have.property('status').be.equal('Created').which.is.a.String();
                  resBody.should.have.property('userData').which.is.a.Object();
                  resBody.should.have.property('days').which.is.a.Array();

                  const userData = resBody.userData;

                  userData.should.have
                     .property('weight')
                     .be.equal(goodBodyDailyRate.weight)
                     .which.is.a.Number();
                  userData.should.have
                     .property('height')
                     .be.equal(goodBodyDailyRate.height)
                     .which.is.a.Number();
                  userData.should.have
                     .property('age')
                     .be.equal(goodBodyDailyRate.age)
                     .which.is.a.Number();
                  userData.should.have
                     .property('desiredWeight')
                     .be.equal(goodBodyDailyRate.desiredWeight)
                     .which.is.a.Number();
                  userData.should.have
                     .property('bloodType')
                     .be.equal(goodBodyDailyRate.bloodType)
                     .which.is.a.Number();
                  userData.should.have.property('dailyRate').be.equal(1326.5).which.is.a.Number();

                  const userDay = resBody.days[0];

                  userDay.should.have.property('id').which.is.a.String();
                  userDay.should.have.property('date').be.equal(currentDate).which.is.a.String();
               });
            });
         });
      });
   });
});
