import React from 'react';
require ('../../styles/application.scss');

const ExistingArticles = ({articles, newArticle, onAdd, onUpdateName, onUpdateRating}) => {
  const articleItems = articles.map((article) => {
    return <div key={article.id}>
      <div className="custom-container">
        <div className='panel-body'>{article.name}</div>
        <div className="panel-footer">
          <span className="label label-default">Sentiment Score: {article.sentiment_score}</span>
        </div>
      </div>
    </div>
  });

  const existingList =
  (<div>
    <section classID="postlist">
      <div className="panel">
        {articleItems}
      </div>
    </section>
  </div>)

  return <div>
    {existingList}
  </div>;
};

export default ExistingArticles;