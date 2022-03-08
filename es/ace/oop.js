"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inherits = void 0;

var inherits = function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports.inherits = inherits;