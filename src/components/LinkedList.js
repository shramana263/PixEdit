class Node {
    constructor(data){
        this.data= data
        this.next= null
        this.prev= null
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.current = null

    }
    insert(data){
        let newNode= new Node(data)
        if(this.head==null){
            this.head =  newNode
            this.current = newNode
        }
        else{
            let temp = this.head;
            while(temp.next !== null){
                temp=temp.next
            }
            temp.next = newNode
            newNode.prev = temp
            this.current= newNode
        }

    }
    undoEdit=()=>{
        const prevData = this.current.prev
        if(prevData){
            this.current= prevData
            return prevData.data
        }
        else{
            return null
        }
    }
    redoEdit=()=>{
        const nextData = this.current.next
        if(nextData){
            this.current= nextData
            return nextData.data
        }
        else{
            return null
        }
    }

    deleteAllNodes() {
        // while(this.prev!=null){
        //     this.current = this.current.prev
        // }
        // this.current.next = null
        this.current.data= this.head.data
        this.current.prev= null
        this.head.next=null
        this.current.next=this.head.next
    }
}

const storeData = new LinkedList()

export default storeData