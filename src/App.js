import React, { Component } from 'react';
import './App.css';

let idNum = 1;
class App extends Component{

  constructor(){
    super();
    this.state = {
      itemText : "",
      allItems : [
        {
        id :  0,
        todoDes : "Sample Task (You can Delete it)",
        isCompleted : false
      }]
  }
  
}

  handleChange(event){ //To keep updating itemText (Text Input) every step we are making changes in our input list.
    const {name,value} = event.target;
    this.setState({[name] : value});
  }

  handleAddItem(){ // To add the item in our list 
    if(this.state.itemText){
      let obj = {
        id : idNum,
        todoDes : this.state.itemText,
        isCompleted : false
      }
      const updateItems = this.state.allItems.push(obj);
      this.setState({updateItems});
      idNum++;
    }
  }

  handleItemDelete(item){ //To delete the item from the list on clicking remove button against any item
    const allItems = this.state.allItems.filter((eachItem) => {
      return eachItem.id !== item.id;
    });
    this.setState({ allItems });
  }

  handleTaskDone(item){ //To mark any task as done
    const updateStatus = this.state.allItems.map((eachItem) => {
      if(item.id === eachItem.id){
        eachItem.isCompleted = true;
      }
      return true;
   });
    this.setState({updateStatus});
  }

  render(){
    return(
      <div>
        <h1>Todo List</h1>
        <div id={"addDiv"}>
          <h4>Add Todo</h4>
          <input id={"textInput"} type={"text"} placeholder={"Add new item"} 
          value={this.state.itemText} name={"itemText"} onChange = { (event) =>{
            this.handleChange(event);
          } } 
          required />

          <br/>
          <button id={"addBtn"} type={"submit"} onClick={() => {
            this.handleAddItem();
          }}>
          Submit </button>
          </div>

          <div id={"listDiv"}>
            <h4> Tasks list </h4>
            {
              this.state.allItems.map((item) => (
                <div className={"listItems"} key={item.id}>
                  {item.isCompleted ? <div className={"taskName isDone"}><strike>{item.todoDes}</strike></div> : <div className={"taskName"}>{item.todoDes}</div>}
                  <span className={"button-span"}> 
                  <button className={"btn-done"} onClick={() => {
                      this.handleTaskDone(item);
                      }
                    }> ✔️ </button>
                    <button className={"btn-remove"} onClick={() => {
                      this.handleItemDelete(item);
                      }
                    }> ❌ </button> 
                  </span>
                </div>
              ))
            }
          </div>
      </div>
    );
  }

}



export default App;
