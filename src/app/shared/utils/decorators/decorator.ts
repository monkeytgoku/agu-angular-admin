// Decorator Factories
export function color(value: string) { // this is the decorator factory
  return (target) => { // this is the decorator
    // do something with 'target' and 'value'...
  };
}

// Decorator Composition
// @f @g x <=> f(g(x))
// The expressions for each decorator are evaluated top-to-bottom.
// The results are then called as functions from bottom-to-top.

// Class Decorators
function classDecorator<T extends new(...args: any[]) => {}>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

// Method Decorators

