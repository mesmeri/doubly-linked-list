const Node = require('./node');

class LinkedList {
    constructor () {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node (data);

        if (this.length) {
            newNode.prev = this._tail;
            this._tail.next = newNode;
        } else {
            this._head = newNode;
        }

        this._tail = newNode;
        this.length++;

        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this.findNode(index).data;
    }

    insertAt(index, data) {

        if (index === 0) {
            let newNode = new Node (data);

            if (this.length) {
                newNode.next = this._head;
                this._head = newNode;
            } else {
                this._head = newNode;
                this._tail = newNode;
            }
            return this;
        }

        let previousNode = this.findNode(index - 1);
        let nextNode = previousNode.next;
        let newNode = new Node(data, previousNode, nextNode);

        previousNode.next = newNode;
        nextNode.prev = newNode;

        return this;
    }

    isEmpty() {
        return (!this.length);
    }

    clear() {
        this._head = {
            data: null,
            next: null,
        };
        this._tail = {
            data: null,
            prev: null
        }
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let itemToRemove = this.findNode(index);
        let previousNode = itemToRemove.prev;
        let nextNode = itemToRemove.next;

        if (index !== 0) {
            previousNode.next = nextNode;
            nextNode.prev = previousNode;
            this.length--;
        }

        return this;
    }

    reverse() {

        if (this.length === (1 || 0)) {
            return this;
        }

        let current = this._head;
        this._tail = current;
        let temp;

        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        this._head = temp.prev;

        return this;
    }

    indexOf(data) {
        let index = 0;
        let current = this._head;

        while (current) {

            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    findNode(index) {
        let num = 0;
        let current = this._head;

        while (num !== index) {
            current = current.next;
            num++;
        }
        
        return current;
    }

}

module.exports = LinkedList;