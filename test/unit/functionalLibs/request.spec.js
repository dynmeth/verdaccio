// @flow

import _ from 'lodash';
import smartRequest, {PromiseAssert} from '../../src/request';
import type {IRequestPromise} from '../../flow/types';

describe('Request Functional', () => {

  const restTest: string = "http://registry.npmjs.org/aaa";

  describe('Request Functional', () => {
    test('PromiseAssert', () => {
      expect(_.isFunction(smartRequest)).toBeTruthy();
    });

    test('basic resolve', (done) => {
      const requestPromise: IRequestPromise = new PromiseAssert((resolve, reject) => {
          resolve(1);
      });
      // $FlowFixMe
      requestPromise.then((result) => {
        expect(result).toBe(1);
        done();
      });
    });
  });
  describe('smartRequest Rest', () => {

    test('basic rest', (done) => {
      const options: any = {
        url: restTest,
        method: 'GET'
      };

      smartRequest(options).then((result)=> {
        expect(_.isString(result)).toBeTruthy();
        done();
      })
    });

    describe('smartRequest Status', () => {

      test('basic check status 200', (done) => {
        const options: any = {
          url: restTest,
          method: 'GET'
        };
        // $FlowFixMe
        smartRequest(options).status(200).then((result)=> {
          expect(JSON.parse(result).name).toBe('aaa');
          done();
        })
      });

      test('basic check status 404', (done) => {
        const options: any = {
          url: 'http://www.google.fake',
          method: 'GET'
        };
        // $FlowFixMe
        smartRequest(options).status(404).then((result)=> {
          // this never is resolved
        }, function(error) {
          expect(error.code).toBe('ENOTFOUND');
          done();
        })
      });
    });
  });
});
