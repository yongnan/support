/*
Closure is an inner function having access to the scope of parent function
even after the parent function has been executed. Let us understand the need
of closures. Suppose that you have a counter in your program.
You can use a global variable and a function to increase the value of the counter.
However, the problem in this scenario is that any part of your code
can modify the value of the global variable without accessing the function.
To tackle this, we will need a variable that is local to the function.
But if you try doing that, the variable will be initialized every time
the function gets called and it will not fulfill our purpose.
This is where closure comes in to the picture.
Consider the following example for a better understanding:
...
 */

var increment = (function () {
    var counter = 0;
    return function () {
        counter += 1;
        console.log(counter);
    }
})();

increment();
increment();
increment();