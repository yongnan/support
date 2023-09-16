/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

abstract class Tree {
    abstract toString(): string;
}

class Empty extends Tree {
    toString(){
        return `Empty`;
    }
}

class Leaf extends Tree {
    constructor(private value: number){
        super();
    }
    toString(){
        return `Leaf(${this.value})`;
    }
}

class Node extends Tree {
    constructor(private left: Tree, private  right: Tree){
        super();
    }
    toString(){
        return `Node(${this.left.toString()}, ${this.right.toString()})`;
    }
}