import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Not, Distinct } = new Context("main");
const solver = new Solver();

const bob = Int.const('bob');
const mary = Int.const('mary');
const cathy = Int.const('cathy');
const sue = Int.const('sue');

/*
cat = 1
dog = 2
bird = 3
fish = 4
*/

// each child can have one pet
solver.add(Or(bob.eq(1), bob.eq(2), bob.eq(3), bob.eq(4)));
solver.add(Or(mary.eq(1), mary.eq(2), mary.eq(3), mary.eq(4)));
solver.add(Or(cathy.eq(1), cathy.eq(2), cathy.eq(3), cathy.eq(4)));
solver.add(Or(sue.eq(1), sue.eq(2), sue.eq(3), sue.eq(4)));
// each pet can only be owned by one person
solver.add(Or(bob.eq(1), mary.eq(1), cathy.eq(1), sue.eq(1)));
solver.add(Or(bob.eq(2), mary.eq(2), cathy.eq(2), sue.eq(2)));
solver.add(Or(bob.eq(3), mary.eq(3), cathy.eq(3), sue.eq(3)));
solver.add(Or(bob.eq(4), mary.eq(4), cathy.eq(4), sue.eq(4)));
// add constraints
solver.add(bob.eq(2));
solver.add(sue.eq(3));
solver.add(Not(mary.eq(4)));

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// solution: 2 1 4 3
const model = solver.model();
const bobVal = model.eval(bob);
console.log(`${bobVal}`);
const maryVal = model.eval(mary);
console.log(`${maryVal}`);
const cathyVal = model.eval(cathy);
console.log(`${cathyVal}`);
const sueVal = model.eval(sue);
console.log(`${sueVal}`);

