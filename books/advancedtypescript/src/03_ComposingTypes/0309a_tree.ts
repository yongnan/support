type Tree = 
| { type: "empty" }
| { type: "leaf"; value: number }
| { type: "node"; left: Tree; right: Tree }

function toString(tree: Tree): string {
    switch (tree.type) {
        case "empty":
            return "Empty";
        case "leaf":
            return `Leaf(${tree.value})`;
        case "node":
            return `Node(${toString(tree.left)}, ${toString(tree.right)})`        
    }
}