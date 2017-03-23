import React from 'react';

const TodoList = ({todos, newTodo, loading, onDelete, onAddTodo, onCompleteTodo, onUpdateName}) => {
  const todoItems = todos.map((todo) => {
    const completeSection = (todo.completed)?
      <span style={{color: 'green'}}>&nbsp;Done!!</span>:
      <button onClick={() => onCompleteTodo(todo.id)}>Complete</button>
    return <li key={todo.id}>
      {todo.name}
      {completeSection}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  });
  const listSection = (loading)?
    (<p><i className="fa fa-spinner fa-spin"></i></p>):
    (<div>
      <ul>{todoItems}</ul>
      <form onSubmit={(e) => {e.preventDefault(); onAddTodo();}}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={newTodo.name} 
          onChange={(e) => onUpdateName(e.target.value)}/>
        <button type='submit'>Create</button>
      </form>
    </div>);
  return <div>
      {listSection}
    </div>;
};

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    completed: React.PropTypes.bool,
    id: React.PropTypes.number
  })),
  newTodo: React.PropTypes.shape({
    name: React.PropTypes.string
  }),
  loading: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onCompleteTodo: React.PropTypes.func,
  onAddTodo: React.PropTypes.func,
  onUpdateName: React.PropTypes.func
};

export default TodoList;