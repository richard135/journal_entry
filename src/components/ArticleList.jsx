import React from 'react';

const TodoList = ({todos, newTodo, loading, onDelete, onAddTodo, onUpdateName}) => {
  const todoItems = todos.map((article) => {
    return <div key={article.id}>
      {article.name}
      <button onClick={() => onDelete(article.id)}>Delete</button>
    </div>
  });

  const listSection =
    (<div>
      <form onSubmit={(e) => {
        e.preventDefault();
        onAddTodo();
      }}>
        <label className='name'>Article Input Here</label>
        <input type='textarea' name='name' value={newTodo.name}
          onChange={(e) => onUpdateName(e.target.value)}/>
        <button type='submit'>Create</button>
      </form>
      <ul>{todoItems}</ul>
    </div>)
  return <div>
      {listSection}
    </div>;
};



export default TodoList;