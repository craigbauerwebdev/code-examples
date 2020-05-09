import { connect } from "react-redux";
import Carbon from "./Carbon";

function mapStateToProps(state) {
  return {
    json:state.json
  };
}

export default connect( mapStateToProps )(Carbon);