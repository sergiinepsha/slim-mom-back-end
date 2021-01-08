//mocha test/auth/createNewUser.test.js

const sinon = require('sinon');

const should = require('should');

const userModel = require('../../api/models/user.model');

const { createNewUser } = require('../../api/helpers');

const { hash } = require('../../api/helpers');

describe('Function  helpers/createNewUser()', () => {
   let data = { email: 'test@test.com', password: 'password', name: 'test' };

   let sandbox;
   let findUserByEmailStub;
   let createStub;
   let errorNewUser;
   let gotAnswer;
   describe('User was found at database', () => {
      beforeEach(async () => {
         sandbox = sinon.createSandbox();
         findUserByEmailStub = sandbox.stub(userModel, 'findUserByEmail');
         findUserByEmailStub.resolves([true]);

         try {
            await createNewUser(data);
         } catch (error) {
            errorNewUser = error;
         }
      });

      afterEach(() => {
         sandbox.restore();
      });

      it('The findUserByEmail function  was called once and accepted email ', () => {
         sinon.assert.calledOnce(findUserByEmailStub);
         sinon.assert.calledWithExactly(findUserByEmailStub, data.email);
      });

      it('Throw error.code 409', () => {
         errorNewUser.code.should.be.equal(409);
      });

      it('Throw error.message true', () => {
         errorNewUser.message.should.be.equal(
            'You could not register or a user with such an email exists or something went wrong',
         );
      });
   });

   describe('User was not found at database', () => {
      let newSpy;

      beforeEach(async () => {
         sandbox = sinon.createSandbox();
         newSpy = sinon.spy();

         findUserByEmailStub = sandbox.stub(userModel, 'findUserByEmail');
         createStub = sandbox.stub(userModel, 'create');

         findUserByEmailStub.resolves(false);
         createStub.resolves({
            _doc: {
               name: data.name,
               email: data.email,
            },
         });

         try {
            await createNewUser(data);
         } catch (error) {
            errorNewUser = error;
         }
      });

      afterEach(() => {
         sandbox.restore();
         sinon.restore();
      });

      it('The findUserByEmail function  was called once ', () => {
         sinon.assert.calledOnce(findUserByEmailStub);
      });

      it('The findUserByEmail function  accepted email', () => {
         sinon.assert.calledWithExactly(findUserByEmailStub, data.email);
      });

      it('hashPassword return the valid answer', () => {
         hashPass = sinon.stub(hash, 'hashPassword').callsFake(() => data.password);

         should(hash.hashPassword(data.password)).be.ok();
         should(hash.hashPassword(data.password)).be.equal(data.password);
      });

      it('The creat function was called once ', () => {
         sinon.assert.calledOnce(createStub);
      });
      it('The creat function accepted ok hashPass', async () => {
         sinon.assert.neverCalledWith(createStub, {
            ...data,
            password: Error,
         });
      });
      it('Answer createNewUser ok', async () => {
         await createNewUser(data).should.be.fulfilledWith({
            name: data.name,
            email: data.email,
         });
      });
   });
});
