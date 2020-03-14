require("@babel/register")({
    extends: './.babelrc',
    ignore: [],
});

import { expect } from 'chai';

global.expect = expect;
global.window = {};
