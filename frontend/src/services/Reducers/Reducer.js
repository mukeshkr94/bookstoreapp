import { ADD_TO_CART, REMOVE_TO_CART, DECR_TO_CART } from "../constant"

const initialState={
    data:[]
}

const cartItem = (state=initialState, action)=>{

    switch(action.type){
        case ADD_TO_CART :
            // console.log('redu', action)
            const itemIndex = state.data.findIndex((ele)=>ele.book_id === action.data.book_id);
            console.log(itemIndex)
            if(itemIndex >=0){
              state.data[itemIndex].book_quantity +=1
            }else{
              const temp = {...action.data, book_quantity:1}

              return {
                ...state,
                data:[...state.data, temp]
        }

            }
           
    case REMOVE_TO_CART :
         const data = state.data.filter((e)=>e.book_id !== action.data)
           return {
            ...state,
            data:data
    }

    case DECR_TO_CART :
      const itemIndexDec = state.data.findIndex((ele)=>ele.book_id === action.data.book_id);
      console.log(itemIndexDec)
      if(state.data[itemIndexDec].book_quantity >=1){
        const dltItem = state.data[itemIndexDec].book_quantity -=1
        console.log([...state.data, dltItem])
        return {
          ...state,
          data:[...state.data]
  }
      }else if(state.data[itemIndexDec].book_quantity ===1){
        const data = state.data.filter((e)=>e.book_id !== action.data)
        return {
         ...state,
         data:data
 }
      }

      

        break;
            default : return state
    }

}

export default cartItem;