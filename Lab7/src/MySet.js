class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    
    prepend(value) {
        const newNode = new LinkedListNode(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    
    remove(value) {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    
    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
    
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
    
    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    clear() {
        this.head = null;
    }

    
    getFirst() {
        if (!this.head) {
            throw new Error('Set is empty');
        }
        return this.head.value;
    }

    
    getLast() {
        if (!this.head) {
            throw new Error('Set is empty');
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        return current.value;
    }
}
class MySet {
    constructor() {
        this.list = new LinkedList(); 
    }

    add(item) {
        if (this.list.contains(item)) {
            return false; 
        }
        this.list.prepend(item);
        return true;
    }

    contains(item) {
        return this.list.contains(item);
    }

    delete(item) {
        return this.list.remove(item);
    }

    size() {
        return this.list.size();
    }

    isEmpty() {
        return this.list.size() === 0;
    }

    clear() {
        this.list.clear();
    }

    toArray() {
        return this.list.toArray();
    }

    getFirst() {
        return this.list.getFirst();
    }

    getLast() {
        return this.list.getLast();
    }
}

module.exports = MySet;