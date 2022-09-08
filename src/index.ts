// import * as data from "./data.json";
// import { User } from './users/user.model';
import { createComment, updateComment, replyToComment, eraseComment, existingComments } from "./comments/comment.services";
import { faker } from '@faker-js/faker';
import { timeDiff } from "./utils/timeDiff";
import { App } from "./nodes";
import * as _ from 'lodash';
import scoreUpIcon from './images/icon-plus.svg';
import scoreDownIcon from './images/icon-minus.svg';
import replyIcon from './images/icon-reply.svg';


const generateComments = () => {
  createComment({
    id: faker.datatype.uuid(),
    comment: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    score: 0,
    user:{
    "image": faker.image.avatar(),
    "username": faker.internet.userName()
      },
    replies: []
  });
}

const newComment = (comment: string) => {
  createComment({
    id: faker.datatype.uuid(),
    comment: comment,
    createdAt: new Date(),
    score: 0,
    user:{
    "image": "./images/avatars/image-amyrobson.png",
    "username": "Daniel"
      },
    replies: []
  })
}

const reply = (id: number, comment: string) => {
  if(!id){
    console.log('Comment not found')
  } else {
    replyToComment(id,
      {
        id: faker.datatype.uuid(),
        comment: comment,
        createdAt: new Date(),
        score: 0,
        user: {
          "image": "./images/avatars/image-juliusomo.png",
          "username": 'Daniel',
        },
    });
  }
}

const update = (id: number, newComment: string) => {
  const index = existingComments.findIndex(el => el.id === id);
  const commentToUpdate = existingComments[index];
  if(commentToUpdate.user.username === 'Daniel'){
    updateComment(
      id,
      newComment
    )
  } else {
    console.log("You only can update your own comments")
  }
}

const deleteComment = (id: number) => {
  const index = existingComments.findIndex(el => el.id === id);
  const commentToDelete = existingComments[index];
  if(commentToDelete.user.username === 'Daniel'){
    eraseComment(id);
  } else {
    console.log('You only can delete your own comments');
  }
}

const loadComments = () => {
  for(let i = 0; i < 10; i++){
    generateComments();
  }
}

const addCommentBox = () => {
  existingComments.forEach(el => {
    const date = timeDiff(el.createdAt, new Date()).toString();

    const commentContainer = document.createElement('div');
    commentContainer.className = 'comment__container';

    // profileInfo es el div que contiene la profilePic, username y fecha del comentario
    const profileInfo = document.createElement('div');
    profileInfo.className = 'comment__profile';
    const profilePic = document.createElement('img');
    profilePic.src = el.user.image;
    const profileUserName = document.createElement('p');
    const profileUserNameText = document.createTextNode(`${el.user.username}`);
    profileUserName.appendChild(profileUserNameText);
    const commentDate = document.createElement('p');
    const commentDateText = document.createTextNode(date)
    commentDate.appendChild(commentDateText);
    profileInfo.append(profilePic,profileUserName,commentDate);

    //Dentro de comment box guardamos el comentario
    const commentBox = document.createElement('div');
    commentBox.className = 'comment__box';
    const commentBoxText = document.createElement('p');
    commentBoxText.innerText = `${el.comment}`;
    commentBox.appendChild(commentBoxText);

    //score
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score__container';
    const score = document.createElement('span');
    score.innerText = `${el.score}`;
    const scoreUp = document.createElement('img');
    scoreUp.src = `${scoreUpIcon}`;
    const scoreDown = document.createElement('img');
    scoreDown.src = `${scoreDownIcon}`;
    scoreContainer.append(scoreUp,score,scoreDown);

    //reply
    const replyContainer = document.createElement('div');
    replyContainer.className = 'reply__container';
    const reply = document.createElement('img');
    reply.src = `${replyIcon}`;
    const replyText = document.createElement('span');
    replyText.innerText = 'Reply';
    replyContainer.append(reply, replyText);

    //reply and score container for mobiles
    const replyScoreContainer = document.createElement('div');
    replyScoreContainer.className = 'replyScore__container';
    replyScoreContainer.append(scoreContainer, replyContainer);

    commentContainer.append(profileInfo,commentBox, replyScoreContainer);

    App?.appendChild(commentContainer);
  })
}

loadComments();
addCommentBox();
