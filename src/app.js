// @flow
'use strict'
require('babel-polyfill');

import { map } from 'lodash/fp';
import SpotifyWebApi from 'spotify-web-api-node';

const main = (): void => {
    const uppercase: ((x: string[]) => string[]) = map((x: string) => x.toUpperCase());
    const str: string = uppercase(["Hello", ", ", "World", "!"]).join("");

    console.log(str);
}

main();
