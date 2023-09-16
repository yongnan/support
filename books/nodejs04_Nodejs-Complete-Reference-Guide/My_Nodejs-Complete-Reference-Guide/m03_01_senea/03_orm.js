const async   = require("async");
const seneca  = require("seneca")();
seneca.use("entity");
seneca.use("jsonfile-store", { folder : "data" });
//seneca.use('jsonfile-store', { folder : "/Users/yongnan/Sync/sandbox/tech/nodejs/codes/bk04_Nodejs-Complete-Reference-Guide/m03_01_senea/Seneca/data" });
const stack = seneca.make$("stack");

stack.load$((err) => {
    if (err) throw err;

    seneca.add("stack:push,value:*", (msg, next) => {
        stack.make$().save$({ value: msg.value }, (err) => {
            return next(err, { value: msg.value });
        });
    });

    seneca.add("stack:pop,value:*", (msg, next) => {
        stack.list$({ value: msg.value }, (err, items) => {
            async.each(items, (item, next) => {
                item.remove$(next);
            }, (err) => {
                if (err) return next(err);

                return next(err, { remove: items.length });
            });
        });
    });

    seneca.add("stack:get", (msg, next) => {
        stack.list$((err, items) => {
            if (err) return next(err);

            return next(null, items.map((item) => (item.value)));
        });
    });

    seneca.listen(3000);
});

// seneca.close(function(err){
//     console.log('database closed!')
// })

