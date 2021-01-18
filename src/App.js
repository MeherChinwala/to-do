import React from 'react';
import './App.css';
import tick from './tick.png';
import trash from './trash.png';

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");
  const [deadline, setDeadline] = React.useState("");


  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value, deadline);
    setValue("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <input
        type="date"
        className="input"
        deadline={deadline}
        onChange={e => setDeadline(e.target.deadline)}
      />
      <input type="submit" value="Submit"></input>
    </form>
  );
}

function Todo({todo, index, completeTodo, removeTodo}) {

  return (
    <div className="todo" style={{textDecoration: todo.isCompleted? "line-through":"", color: todo.isCompleted? 'grey':'black'}}>
      {todo.text}
      <div>
      { !todo.isCompleted? <button class="complete" onClick={()=>completeTodo(index)}><img src={tick} alt="done" height="20" width="20"></img></button> : null } 
        <button class="delete" onClick={()=>removeTodo(index, todo.isCompleted)}><img src={trash} alt="done" height="20" width="20"></img></button>
      </div>
    </div>
  );
};

function App() {
 const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    const newDoneTodos = [...doneTodos, newTodos[index]]
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setDoneTodos(newDoneTodos)
    //console.log(newTodos);
  };

  const removeTodo = (index, isCompleted) => {
    if(!isCompleted){
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
    else{
      const newTodos = [...doneTodos];
      newTodos.splice(index, 1);
      setDoneTodos(newTodos);
    }
  }; 

  const [todos, setTodos] = 
    React.useState([
      { text: "Default",
        isCompleted: false
      }
    ]);
  const [doneTodos, setDoneTodos] =
    React.useState([
      { text: "DonebyDefault",
        isCompleted: true
      }
    ]);

  const addTodo = (text, deadline) => {
    const todo = 
      { text: text,
        isCompleted: false
      }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };
  
 return (
    <div className="app">
      <h1 class="heading">Your Tasks</h1>
     <div className="todo-list">
        <h3>Tasks To Do</h3>
        {!todos.length? <div>None</div> : <div>{todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
        ))}</div>}
        <h3>Completed Tasks</h3>
        {!doneTodos.length? <div>None</div> : <div>{doneTodos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          removeTodo={removeTodo}
        />
        ))}</div>}
      <h3>Add a new task (and deadline):</h3> <TodoForm addTodo={addTodo} />
      <br></br>
     </div>
    </div>
  );
}

export default App;
