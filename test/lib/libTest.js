'use strict'

import { expect } from 'chai';
import _ from 'lodash';
import upcaseList from '~/src/lib';

function randomString(length) {
    const base = 36;
    const precision = 8;
    const prefixLength = 2;
    
    const delimiter = ((Math.random().toString(base)+('0'.repeat(precision)))
		       .slice(prefixLength, precision+prefixLength))

    const outputLength = length > 0 ? Math.ceil(length/precision) : 0;

    return Array(outputLength).join(delimiter).slice(0, length);
}

describe('upcaseList', () => {
    const strings = _.map(_.times(10, _.random.bind(5, 15)), randomString);
    const upcase = upcaseList(strings);
    
    it('should not change string length', () => {
	const diff = upcase.filter((str, ix) => str.length !== strings[ix].length);

	expect(diff).to.be.empty;
    });
    
    it('should capitalize all strings given', () => {		      
	const diff = upcase.filter((str, ix) => str !== strings[ix].toUpperCase());
	
	expect(diff).to.be.empty;
    });
});
