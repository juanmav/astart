const test = require('tape');
const bs = require('binary-search');
const Heap = require("collections/heap");
const SortedArray = require("collections/sorted-array");

test.skip('Creating inserts', function (t) {
    const nodes = [
        '306442043', '306442044',
        '306442045', '306442046',
        '306442047', '306442048',
        '306442049', '306442050',
        '306442051', '306442052',
        '306442054', '306442055'
    ];
    const result = nodes.reduce( (acc, node, index) => {
        return nodes[index + 1] ? acc.concat([[node, nodes[index+ 1 ]]]): acc;
    },[]);

    t.ok(nodes.length - 1 === result.length);

    const inserts = result.map(tuple => `INSERT INTO relations VALUES (${tuple[0]}, ${tuple[1]})`);
    console.log(result);
    console.log(inserts);
    t.end()

});


test.skip('binary test', function(t) {

    let array =[
        {id: 102}, {id: 210}, {id: 350}, {id: 400},
        {id: 402}, {id: 510}, {id: 550}, {id: 600}
    ];
    let index = bs(
        array,
        600,
        function(element, needle) {
            return element.id - needle;
        }
    );
    console.log(index);
    console.log(array[index]);
    t.end();
});

test('Binary heap test Pops', function (t) {
    const heap =  new Heap([], null, function (a, b) {
        return b.f - a.f ;
    });

    heap.push({id: 10, f: 11});
    heap.push({id: 14, f: 5});
    heap.push({id: 12, f: 11.5});
    heap.push({id: 20, f: 3});
    heap.push({id: 5, f: 1});

    t.ok(heap.length === 5);

    t.ok(heap.pop().f === 1);
    t.ok(heap.pop().f === 3);
    t.ok(heap.pop().f === 5);
    t.ok(heap.pop().f === 11);
    t.ok(heap.pop().f === 11.5);

    t.ok(heap.length === 0);

    t.end();

});

test.only('Binary heap test Float', function (t) {
    const heap =  new Heap([],
        (a,b) => a.id === b.id,
        (a,b) => b.f - a.f
    );

    heap.push({id: 10, f: 11});
    heap.push({id: 14, f: 5});
    let toSink = {id: 12, f: 11.5};
    heap.push(toSink);
    heap.push({id: 20, f: 3});
    heap.push({id: 5, f: 1});

    t.ok(heap.length === 5);

    toSink.f = 0.1;

    heap.float(heap.indexOf(toSink));

    t.ok(heap.pop().f === 0.1);
    t.ok(heap.pop().f === 1);
    t.ok(heap.pop().f === 3);
    t.ok(heap.pop().f === 5);
    t.ok(heap.pop().f === 11);

    t.ok(heap.length === 0);

    t.end();

});



test('Sorted Array', function (t) {

    const sortedArray = new SortedArray(
        null,
        (a,b) => a.id === b.id,
        (a,b) => b.id - a.id
    );

    sortedArray.push({id: 10, f: 11});
    sortedArray.push({id: 14, f: 5});
    sortedArray.push({id: 12, f: 11.5});
    sortedArray.push({id: 20, f: 3});
    sortedArray.push({id: 5, f: 1});

    t.ok(sortedArray.get({id: 5}).f === 1);

    t.ok(sortedArray.length === 5);


    t.ok(sortedArray.pop().id === 5);
    t.ok(sortedArray.pop().id === 10);

    t.end();


});

