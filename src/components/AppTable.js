import React, { Component } from 'react';
import { connect} from 'react-redux';
import * as contactAction from '../actions/contactAction';

class AppTable extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ''
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name
    }
    this.setState({
      name: ''
    });
    this.props.createContact(contact);
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }


  listView(data, index){
    return (  <li key = {index}>
    <div className="row">
        <div className="col-md-10">
                {data.name}
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div> 
    </li>
    )
  }

  renderList(props){
      if (props.contacts.length === 0){
          return null;
      } else{
          console.log(props.contacts)
        props.contacts.map((name, i) => this.listView(name, i))}
  }

  render() {
      console.log(this.props)
    return(
      <div className="container">
        <h1>Loans</h1>
        <hr />
        <div>
          <h3>Configure Debts</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} className="form-control" value={this.state.name}/><br />
            <input type="submit" className="btn btn-success" value="ADD"/>
          </form>
        <hr />
            { this.props.contacts.length === 0 ? ( null ) : 
                ( <ul className="list-group">
                    {this.props.contacts.map((name, i) =>  this.listView(name, i)) }
                </ul> )}
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
      contacts: state
    }
    
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createContact: contact => dispatch(contactAction.createContact(contact)),
      deleteContact: index => dispatch(contactAction.deleteContact(index))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(AppTable);
