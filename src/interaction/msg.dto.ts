export class MsgProdDTO<T>{
    data: T
    constructor(d: T){
        this.data = d
    }
}
export class MsgListenerDTO<T> extends MsgProdDTO<T>{
    constructor(d: T){
        super(d)
    }
}