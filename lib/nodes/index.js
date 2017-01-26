'use strict';

const TextNode = require('./text');

const types = {
  math: require('./math'),
  mrow: require('./mrow'),
  mstyle: require('./mstyle'),
  mfrac: require('./mfrac'),
  mi: require('./mi'),
  mn: require('./mn'),
  mo: require('./mo'),
  mover: require('./mover'),
  msqrt: require('./msqrt'),
  msup: require('./msup'),
  msub: require('./msub'),
};

function memoizeFunction(fn) {
  const results = {};
  return (...args) => {
    const key = args.join(',');
    if (!(key in results)) {
      results[key] = fn(...args);
    }
    return results[key];
  };
}
function typeCheck(fn, argHandler, returnHandler) {
  return (...args) => {
    argHandler(...args);
    const result = fn(...args);
    returnHandler(result);
    return result;
  };
}
function memoizeNode(node) {
  node.getFontLevel = typeCheck(
    memoizeFunction(node.getFontLevel.bind(node)),
    () => {},
    (fontLevel) => {
      if (typeof fontLevel !== 'number' || isNaN(fontLevel)) {
        throw new Error('Expected getFontLevel to return a number');
      }
    }
  );
  node.measure = typeCheck(
    memoizeFunction(node.measure.bind(node)),
    (fontSize) => {
      if (typeof fontSize !== 'number' || isNaN(fontSize)) {
        throw new Error('Expected fontSize to be a number');
      }
    },
    dimensions => {
      if (!dimensions || !typeof dimensions === 'object') {
        throw new Error('Expected measure to return an Object');
      }
      if (typeof dimensions.width !== 'number' || isNaN(dimensions.width)) {
        throw new Error('Expected dimensions.width to return a number');
      }
      if (typeof dimensions.height !== 'number' || isNaN(dimensions.height)) {
        throw new Error('Expected dimensions.width to return a number');
      }
    }
  );
  node.render = typeCheck(
    node.render.bind(node),
    (left, top, fontSize) => {
      if (typeof left !== 'number' || isNaN(left)) {
        throw new Error('Expected left to be a number');
      }
        if (typeof top !== 'number' || isNaN(top)) {
          throw new Error('Expected top to be a number');
        }
      if (typeof fontSize !== 'number' || isNaN(fontSize)) {
        throw new Error('Expected fontSize to be a number');
      }
    },
    svg => {
      if (!svg || !typeof svg === 'string') {
        throw new Error('Expected render to return a string of svg');
      }
    }
  );
  return node;
}
function createNode(type, attribs, children) {
  if (!(type in types)) {
    // todo: remove this once all the elements are implemented.
    return createTextNode(type);
  }
  const NodeType = types[type];
  const node = new NodeType(attribs, children);
  return memoizeNode(node);
}
function createTextNode(text) {
  const node = new TextNode(text);
  return memoizeNode(node);
}

module.exports = {createNode, createTextNode};
