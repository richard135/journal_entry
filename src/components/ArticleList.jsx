import React from 'react';
require ('../../styles/application.scss');

const ArticleList = ({articles, newArticle, onAdd, onUpdateName, onUpdateRating}) => {
  const articleItems = articles.map((article) => {
    return <div className='top-border' key={article.id}>
      <div className="custom-container">
        <div className='panel-body'>{article.name}</div>
        <div className="panel-footer">
          <span className="label label-default">SENTIMENT SCORE: {article.sentiment_score}</span>
        </div>
      </div>
    </div>
  });
  const votingInteger = [];
  for (let i = 10; i > -11 ; i--) {
    votingInteger.push(<option key={i} value= {i}> {i} </option>)
  }
  const listSection =
    (<div>
      <div className="widget-area no-padding blank">
        <div className="status-upload">
          <div className="form-article">
            <section className = "panel">
              <form onSubmit={(e) => {
                e.preventDefault();
                onAdd();
              }}>
                <h2>Your Article Here!</h2>
                <textarea type='textarea' value={newArticle.name}
                  onChange={(e) => onUpdateName(e.target.value)}/>
                  <select className='drop-bar' onChange={(e) => onUpdateRating(e.target.value)}>
                    <optgroup label="HAPPINESS LEVEL">
                    {votingInteger}
                    </optgroup>
                  </select>
                <button type='submit' className="btn btn-success green">CREATE</button>
              </form>
            </section>
            <section classID="postlist">
              <div className="panel">
                {articleItems}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>)
    return <div>
      {listSection}
    </div>;
};

export default ArticleList;




