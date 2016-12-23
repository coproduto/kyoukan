'use strict'

import { expect } from 'chai';

describe('Arithmetic (server)', () => {
    it('should calculate 1 + 1 correctly', () => {
	expect(1 + 1).to.equal(2);
    });
});

console.log('loaded tests');
