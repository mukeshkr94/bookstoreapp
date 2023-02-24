import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import { addToCart, removeToCart, decreaseItem } from "../services/Actions/Actions";

const mapStateToProps = state=>({
    state
   });
   
   const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data)),
    decreaseItemHandler:data=>dispatch(decreaseItem(data))
   })
   
   export default connect(mapStateToProps, mapDispatchToProps) (Navbar);

