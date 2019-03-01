/**
 * 高阶函数
 * 作用：封装函数，使函数执行前或后，执行相同的指定操作。
 */
const wrapperFunc = (func) => {
  return (...args) => {
    console.log('I want to do something...');
    return func(...args)
  }
};

const funcA = (name) => {
  console.log(`My name is ${name}.`);
};

const funcB = (name) => {
  console.log(`My name is ${name}.`);
};

try {
  wrapperFunc(funcA)('bill');
  wrapperFunc(funcB)('tom');
} catch (e) {
  console.log(e)
}
