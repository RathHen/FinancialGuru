import React, { Component } from 'react';
import { connect} from 'react-redux';

class data extends Component{

    render() {
        console.log(this.props)
        return <div>Here</div>
    
}
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    
  };



export default connect(mapStateToProps)(data);