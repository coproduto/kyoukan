// @flow
'use strict'
require('babel-polyfill');

import { map } from 'lodash/fp';
import SpotifyWebApi from 'spotify-web-api-node';
import Promise from 'bluebird';

const main = (): void => {
    const uppercase: ((x: string[]) => string[]) = map((x: string) => x.toUpperCase());
    const str: string = uppercase(["Hello", ", ", "World", "!"]).join("");

    console.log(str);
}

main();
