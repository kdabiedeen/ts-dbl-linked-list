class DLLNode<K, V> {
    key: K;
    value: V;
    next: DLLNode<K, V> | null = null;
    prev: DLLNode<K, V> | null = null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export class LRUCache<K, V> { 
    private capactiy: number;
    private map: Map<K, DLLNode<K,V>> = new Map();
    private head: DLLNode<K, V> | null = null; // most recent
    private tail: DLLNode<K, V> | null = null;

    constructor(capacity: number) {
        this.capactiy = capacity;
    }

    get(key: K): V | undefined {
        const node = this.map.get(key);
        if (!node) return undefined;
        this.moveToFront(node);
        return node.value;
    }

    put(key: K, value: V): void {
        let node = this.map.get(key)

        if (node) {
            node.value = value;
            this.moveToFront(node);
        } else { 
            node = new DLLNode(key, value);
            this.map.set(key, node);
            this.insertAtFront(node);

            if (this.map.size > this.capactiy) {
                this.evictLeastUsed();
            }
        }
    }

    private insertAtFront(node: DLLNode<K, V>): void {
        node.next = this.head;
        node.prev = null;

        if (this.head) this.head.prev = node;
        this.head = node;

        if (!this.tail) this.tail = node;
    }


    private moveToFront(node: DLLNode<K, V>): void {
        if (node == this.head) return;

        this.removeNode(node);
        this.insertAtFront(node);
    }

    private removeNode(node: DLLNode<K, V>): void {
        // if head, just move head of the list otherwise...
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;

        // if tail, set tail to the prev node otherwise...
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
    }

    private evictLeastUsed(): void {
        if (!this.tail) return;

        this.map.delete(this.tail.key);
        this.removeNode(this.tail);
    }

    keys(): K[] {
        const keys: K[] = [];
        let current = this.head;
        while (current) {
            keys.push(current.key);
            current = current.next;
        }
        return keys;
    }
}
