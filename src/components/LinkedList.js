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
        // console.log("inserted data : ",data.image)
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
        if(prevData!=null){
            this.current= prevData
            return prevData.data
        }
        else{
            return null
        }
    }
    redoEdit=()=>{
        const nextData = this.current.next
        if(nextData!=null){
            this.current= nextData
            return nextData.data
        }
        else{
            return null
        }
    }

    deleteAllNodes=()=> {
        
        this.current.data= this.head.data
        this.current.prev= null
        this.head.next=null
        this.current.next=this.head.next
    }

    originalImage=()=>{
        if(this.head.data!=null){
            return this.head.data
        }
        else{
            return null
        }
    }

    lastEditedImage=()=>{
        return this.current.data
    }
}

const storeData = new LinkedList()

export default storeData