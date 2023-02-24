import { connect } from "react-redux";
import Home from "../components/home";
import { addToCart, removeToCart } from "../services/Actions/Actions";

const mapStateToProps = state=>({
    state
   });
   
   const mapDispatchToProps=dispatch=>({
       addToCartHandler:data=>dispatch(addToCart(data)),
       removeToCartHandler:data=>dispatch(removeToCart(data)) 
   })
   
   export default connect(mapStateToProps, mapDispatchToProps) (Home);

