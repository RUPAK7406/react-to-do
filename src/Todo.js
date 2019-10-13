import React, { Component } from 'react';
import {Button, Navbar, NavbarBrand, Alert} from 'reactstrap';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [{
        id: '1',
        title: 'Buy Milk.',
        done: false,
        date: new Date()
      }, {
        id: '2',
        title: 'Meeting with Ali.',
        done: false,
        date: new Date()
      }, {
        id: '3',
        title: 'Tea break.',
        done: false,
        date: new Date()
      }, {
        id: '4',
        title: 'Go for a run.',
        done: false,
        date: new Date()
      }]
    }
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: [...this.state.mockData, {
        id: Date.now(),
        title: event.target.item.value,
        done: false,
        date: new Date()
      }]
    });

    event.target.item.value = '';
  }

  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }

        return item;
      })
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} />
        <Button color="primary">update</Button><br></br>
        </form>
        
    }
  }

  render() {
    return (
        <div>
          <div>
        <Navbar dark color="primary">
          <div className = "container"><NavbarBrand href = "/"><h3>REACT TODO APP</h3></NavbarBrand></div>
         </Navbar> 
         
      </div><br></br>
      
        {this.renderEditForm()}
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="text" name="item" className="item" required/>
            <Button color="primary">Add</Button>
          
        </form> <br></br>
        
          {this.state.mockData.map(item => (
            <Alert color ="dark" className="container">
            <li key={item.id} className={ item.done ? 'done' : 'hidden' }>
              {item.title}
              <Button color="danger" onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</Button>
              <Button color ="warning" onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</Button>
              <Button color = "success" onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</Button>
            </li>
            </Alert>
          ))}
        
      </div>
    );
  }
}

export default Todo;
