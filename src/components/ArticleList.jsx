import React from 'react';

const ArticleList = ({articles, newArticle, loading, onDelete, onAdd, onUpdateName}) => {
  const articleItems = articles.map((article) => {
    return <div key={article.id}>
      {console.log('This is article ====>',article)}
      <p>Article: {article.name} - Word Count:{article.words} </p>
      <hr/>
      <button onClick={() => onDelete(article.id)}>Delete</button>
    </div>
  });

  let votingInteger = [];
  for (let i = 10; i > -11 ; i--) {
    votingInteger.push(<option value= {i}> {i} </option>)
  }





  const listSection =
    (<div>
      <form onSubmit={(e) => {
        e.preventDefault();
        onAdd();
      }}>
        <label className='name'>Article Input Here</label>
        <input type='textarea' name='name' value={newArticle.name}
          onChange={(e) => onUpdateName(e.target.value)}/>
        <select>
          {votingInteger}
        </select>
        <button type='submit'>Create</button>
      </form>
      <ul>{articleItems}</ul>
    </div>)
  return <div>
      {listSection}
    </div>;
};



export default ArticleList;