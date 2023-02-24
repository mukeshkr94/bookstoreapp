
import {ADD_TO_CART,REMOVE_TO_CART,DECR_TO_CART} from '../constant';


export const addToCart =(data)=>{
    return{ 
        type:ADD_TO_CART,
        data:data
    }
}


export const removeToCart =(id)=>{
    return{
        type:REMOVE_TO_CART,
        data: id
    }
}

export const decreaseItem =(data)=>{
    return{
        type:DECR_TO_CART,
        data: data
    }
}