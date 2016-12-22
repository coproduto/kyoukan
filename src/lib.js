'use strict'

import { map } from 'lodash/fp';

const upcaseList = map(x => x.toUpperCase());

export default upcaseList;
