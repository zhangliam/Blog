// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;
    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
person.sayYourName(); // I am Kevin


// 第一版
function objectFactory() {
  var obj = new Object()
  var Constructor = [].prototype.shift(arguments)

  obj.__proto__ = Constructor.prototype
  Constructor.apply(obj, arguments)

  return obj
}
// 1. 用new Object() 的方式新建了一个对象 obj
// 2. 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
// 3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
// 4. 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
// 5. 返回 obj


// 返回值效果实现: 若构造函数有返回值或者基本类型
// 返回对象
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

// 返回基本类型
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18


// 所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么

// 第二版
function objectFactory() {
  var obj = new Object()
  var Constructor = [].prototype.shift(arguments)

  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? ret : obj
}








