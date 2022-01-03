import React from 'react';
import {Link} from 'react-router-dom';
import ReviewStartAndCount from '../../../components/ReviewStartAndCount/ReviewStartAndCount';
import './Comments.scss';

export default function Comments({experience, ...props}) {
  const commentsMock = [
    {
      nombreUser: 'Pablo',
      avatarUser: 'https://dummyimage.com/150x150',
      date: 'January 2021',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maximus dolor, inquit, brevis est. Comprehensum, quodcognitum non habet? Si longus, levis dictata sunt. Non risu potius quam oratione eiciendum? Istic sum, inquit. Ita prorsus, inquam.'
    },
    {
      nombreUser: 'Luis',
      avatarUser: 'https://dummyimage.com/150x150',
      date: 'January 2021',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maximus dolor, inquit, brevis est. Comprehensum, quodcognitum non habet? Si longus, levis dictata sunt. Non risu potius quam oratione eiciendum? Istic sum, inquit. Ita prorsus, inquam.'
    },
    {
      nombreUser: 'Margarita',
      avatarUser: 'https://dummyimage.com/150x150',
      date: 'January 2021',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maximus dolor, inquit, brevis est. Comprehensum, quodcognitum non habet? Si longus, levis dictata sunt. Non risu potius quam oratione eiciendum? Istic sum, inquit. Ita prorsus, inquam.'
    },
    {
      nombreUser: 'Carmen',
      avatarUser: 'https://dummyimage.com/150x150',
      date: 'January 2021',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maximus dolor, inquit, brevis est. Comprehensum, quodcognitum non habet? Si longus, levis dictata sunt. Non risu potius quam oratione eiciendum? Istic sum, inquit. Ita prorsus, inquam.'
    }
  ];

  return (
    <div className="experience-page-comments">
      <div className="head-comments">
        <h3>User comments</h3>
      </div>
      <div className="comments">
        {commentsMock.map((comment, index) => (
          <div key={index}>
            <div className="comment">
              <div className="comment-head">
                <Link to="#">
                  <img src={comment.avatarUser} alt="" />
                </Link>
                <div className="info">
                  <h4 className="user-name">{comment.nombreUser}</h4>
                  <span>{comment.date}</span>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
