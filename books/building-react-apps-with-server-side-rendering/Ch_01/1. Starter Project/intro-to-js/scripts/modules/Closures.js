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