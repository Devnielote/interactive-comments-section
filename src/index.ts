// import * as data from "./data.json";
// import { User } from './users/user.model';
import { createComment, updateComment, reply, eraseComment, existingComments, currentUser } from "./comments/comment.services";
import { faker } from '@faker-js/faker';
import { App } from "./nodes";
import * as _ from 'lodash';
import scoreUpIcon from './images/icon-plus.svg';
import scoreDownIcon from './images/icon-minus.svg';
import replyIcon from './images/icon-reply.svg';
import deleteIcon from './images/icon-delete.svg';
import editIcon from './images/icon-edit.svg';
import TimeDiff from 'js-time-diff';
import "./css/normalize.css";
import "./css/main.css";

const newComment = (comment: string) => {
  createComment({
    id: faker.datatype.uuid(),
    comment: comment,
    createdAt: new Date(),
    score: faker.datatype.number({
      'min': 1,
      'max': 20,
    }),
    user:{
    "image": currentUser.image,
    "username": currentUser.username
      },
    replies: []
  });
  loadComments();
  addCommentBox();
}

const replyToComment = (id: number | string, comment: string ) => {
  if(!id){
    console.log('Comment not found')
  } else {
    reply(id,
      {
        id: faker.datatype.uuid(),
        comment: comment,
        createdAt: new Date(),
        score: faker.datatype.number({
          'min': 1,
          'max': 10,
        }),
        user: {
          "image": currentUser.image,
          "username": currentUser.username,
        },
    });
  }
  loadComments();
  addCommentBox();
}

const update = (id: number | string, newComment: string | null) => {
  const index = existingComments.findIndex(el => el.id === id);
  const commentToUpdate = existingComments[index];
  if(commentToUpdate.user.username === 'You'){
    updateComment(
      id,
      newComment
    )
  };
  loadComments();
  addCommentBox();
}

const deleteComment = (id: number | string) => {
  const index = existingComments.findIndex(el => el.id === id);
  const commentToDelete = existingComments[index];
  if(commentToDelete.user.username === 'You'){
    eraseComment(id);
  }
  loadComments();
  addCommentBox();
}

const randomCommetns = () => {
  for(let i = 0; i < 4; i++){
    createComment({
      id: faker.datatype.uuid(),
      comment: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      score: faker.datatype.number({
        'min': 1,
        'max': 20,
      }),
      user:{
      "image": faker.image.avatar(),
      "username": faker.name.firstName()
        },
      replies: []
    });
  }
}

const sortComments = () => {
  existingComments.sort((a,b) => b.score - a.score);;
}

const loadComments = () => {
  sortComments();
  App.innerText = '';
  existingComments.forEach(el => {
    const date = TimeDiff(el.createdAt, new Date()).toString();

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
    const commentDateText = document.createTextNode(date);
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
    replyContainer.addEventListener('click', () => {
      let comment = prompt(`Replying to: ${el.user.username}`);
      replyToComment(el.id, comment);
    })
    //reply and score container for mobiles
    const replyScoreContainer = document.createElement('div');
    replyScoreContainer.className = 'replyScore__container';
    replyScoreContainer.append(scoreContainer, replyContainer);

     //delete and edit buttons
    if(el.user.username === currentUser.username) {

    replyContainer.classList.add('disable');

    const deleteEditBtnContainer = document.createElement('div');
    deleteEditBtnContainer.className = 'deleteEditBtnContainer';
    const deleteBtn = document.createElement('div');
    const deleteBtnImg = document.createElement('img');
    deleteBtnImg.src = deleteIcon;
    deleteBtn.innerText = 'Delete';
    deleteBtn.appendChild(deleteBtnImg);
    deleteBtn.addEventListener('click', () => deleteComment(el.id));

    const editBtn = document.createElement('div');
    const editBtnImg = document.createElement('img');
    editBtnImg.src = editIcon;
    editBtn.innerText = 'Edit';
    editBtn.appendChild(editBtnImg);
    editBtn.addEventListener('click', () => {
      let editedComment =  prompt('Editing comment');
      if(editedComment !== el.comment){
        update(el.id, editedComment);
      }
    })
    deleteEditBtnContainer.append(deleteBtn, editBtn);

    replyScoreContainer.append(deleteEditBtnContainer);

    commentContainer.append(profileInfo,commentBox,replyScoreContainer);


    } else {
      commentContainer.append(profileInfo,commentBox, replyScoreContainer);
    }

    //Después de que todo cargue buscamos replies
    if(el.replies.length >= 1){
      console.log(`El comentario de ${el.user.username} tiene respuestas`)
      el.replies.map(el => {
        const newReplyContainer = document.createElement('div');
        newReplyContainer.className = 'comment__container';

        const profileInfo = document.createElement('div');
        profileInfo.className = 'comment__profile';
        const profilePic = document.createElement('img');
        profilePic.src = el.user.image;
        const profileUserName = document.createElement('p');
        const profileUserNameText = document.createTextNode(`${el.user.username}`);
        profileUserName.appendChild(profileUserNameText);
        const commentDate = document.createElement('p');
        const commentDateText = document.createTextNode(TimeDiff(el.createdAt, new Date()).toString());
        commentDate.appendChild(commentDateText);
        profileInfo.append(profilePic,profileUserName,commentDate);

        const commentBox = document.createElement('div');
        commentBox.className = 'comment__box';
        const commentBoxText = document.createElement('p');
        commentBoxText.innerText = `${el.comment}`;
        commentBox.appendChild(commentBoxText);

        const scoreContainer = document.createElement('div');
        scoreContainer.className = 'score__container';
        const score = document.createElement('span');
        score.innerText = `${el.score}`;
        const scoreUp = document.createElement('img');
        scoreUp.src = `${scoreUpIcon}`;
        const scoreDown = document.createElement('img');
        scoreDown.src = `${scoreDownIcon}`;
        scoreContainer.append(scoreUp,score,scoreDown);

        newReplyContainer.append(profileInfo, commentBox,scoreContainer)
        commentContainer.append(newReplyContainer);
      })
    }
    App.appendChild(commentContainer);
  })

}

const addCommentBox = () => {
  const addCommentContainer = document.createElement('div');
  addCommentContainer.classList.add('comment__container');
  addCommentContainer.classList.add('currentUser__container');

  //current user comment box
  const inputContainer = document.createElement('div');
  inputContainer.className = 'currentUser__commentBox'
  const input = document.createElement('input');
  input.id = 'inputValue';
  input.type = 'text';
  input.placeholder = 'Add a comment...';
  inputContainer.appendChild(input);

  //Container for pic and send button in mobiles
  const picAndSendBtnContainer = document.createElement('div');
  picAndSendBtnContainer.className = 'profileAndBtn__container';

  //current user profile pic
  const currentUserContainer = document.createElement('div');
  currentUserContainer.className = 'comment__profile';
  const currentUserPic = document.createElement('img');
  currentUserPic.src = currentUser.image;
  currentUserContainer.appendChild(currentUserPic);

  //send button
  const button = document.createElement('button');
  button.className = 'send__button';
  button.innerText = 'SEND';
  button.addEventListener('click', () => {
    if(!input.value.length){
      alert('Write something...')
    } else {
      newComment(input.value)
    }
  })

  picAndSendBtnContainer.append(currentUserContainer, button);


  addCommentContainer.append(inputContainer,picAndSendBtnContainer);

  App.appendChild(addCommentContainer);
}

randomCommetns();
loadComments();
addCommentBox();