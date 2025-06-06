class DLLNode<T> {
    value: T;
    next: DLLNode<T> | null = null;
    prev: DLLNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class DoubleLinkedList<T> {
    head: DLLNode<T> | null = null;
    tail: DLLNode<T> | null = null;
    private nodeMap: Map<T, DLLNode<T>> = new Map();

    append(value: T): void {
        const newNode = new DLLNode(value)
        this.nodeMap.set(value, newNode)

        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    prepend(value: T): void {
        const newNode = new DLLNode(value);
        this.nodeMap.set(value, newNode);

        if (!this.head) {
            this.head = this.tail = newNode
        } else {
            newNode.next = this.head
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    delete(value: T): void {
        const node = this.nodeMap.get(value);
        if (!node) return;

        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
    
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
    
        this.nodeMap.delete(value);

        // Note: PREOPTIMIZED without a Map
        // let current = this.head;

        // while (current) {
        //     if (current.value === value) {
        //         if (current.prev) current.prev.next = current.next;
        //         else this.head = current.next;

        //         if (current.next) current.next.prev = current.prev;
        //         else this.tail = current.prev;
        //     }
        //     current = current.next;
        // }
    }

    find(value: T): DLLNode<T> | null {
        return this.nodeMap.get(value) || null;

        // Note: PREOPTIMIZED without a Map
        // let current = this.head;

        // while (current) {
        //     if (current.value === value) return current;
        //     current = current.next;
        // }

        // return null;
    }
}