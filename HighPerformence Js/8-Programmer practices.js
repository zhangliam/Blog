/*  高性能JavaScript  */ 


// ------ 编程实践


// 避免双重求值(Double Evaluation)
// 当JS中执行另一端JS代码的时候, 都会导致双重求值的性能消耗
// eval, Function, setTimeout, setInterval 都要创建一个新的解释器/编译器实例所以代码执行速度会变慢


var num1 = 5, 
    num2 = 6,
    result = eval('num1 + num2'),
    sum = new Function('arg1', 'arg2', 'return arg1 + arg2');

setTimeout('sum = num1 + num2', 100)
setInterval('sum = num1 + num2', 100)


// 位操作
// 计算机中的数在内存中都是以二进制形式进行存储的，用位运算就是直接对整数在内存中的二进制位进行操作，因此其执行效率非常高，在程序中尽量使用位运算进行操作，这会大大提高程序的性能。

// 乘除法: 数 a 向右移一位，相当于将 a 除以 2；数 a 向左移一位，相当于将 a 乘以 2
int a = 2;
a >> 1; ---> 1
a << 1; ---> 4


// 位操作交换两数
// a. 普通操作
void swap(int &a, int &b) {
  a = a + b;
  b = a - b;
  a = a - b;
}

// b. 位与操作
void swap(int &a, int &b) {
  a ^= b;
  b ^= a;
  a ^= b;
}

// 位操作判断奇偶数
if((a & 1) == 0) {
 //偶数
}


// 位操作交换符号: 换符号将正数变成负数，负数变成正数
int reversal(int a) {
  return ~a + 1;
}

/*

  总结: 
    1. 避免双重求值
    2. 尽量使用直接量来创建数组&数组
    3. 避免重复工作, 当检查浏览器时, 可以使用延迟加载或条件预加载
    4. 在进行数学计算时, 考虑使用操作数组二进制位运算
    5. 尽量使用JS原生方法(底层C++已实现)

*/ 



