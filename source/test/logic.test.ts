// import { describe, expect, test } from '@jest/globals';

import { service } from '../logic/index';

// describe('logic test', () => {
//   test('sinup user', async () => {
//     const f = await service.sing.createUser({ phone: '1234', password: '134' });
//     expect(f).toEqual({
//       phone: '1234',
//       password: '134',
//     });
//   });
// });

it('sinup user', async () => {
  const f = await service.sing.createUser({ phone: '1234', password: '134' });
  expect(f).toEqual({
    phone: '1234',
    password: '134',
  });
});
