import React from 'react';

const ArticleList = ({articles, newArticle, onAdd, onUpdateName, onUpdateRating}) => {
  const articleItems = articles.map((article) => {
    return <div key={article.id}>
      <p>Article: {article.name} - Word Count:{article.words} - Rating: {article.rating} - Sentiment Score: {article.sentiment_score}</p>
      <hr/>
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
        <select className="select" name='select' onChange={(e) => onUpdateRating(e.target.value)}>
          <optgroup label="Select Table">
          {votingInteger}
          </optgroup>
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