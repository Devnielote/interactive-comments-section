// import * as data from "./data.json";
// import { User } from './users/user.model';
import { createComment, updateComment, reply, eraseComment, existingComments } from "./comments/comment.services";
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
import { Account } from "./accounts/Account";
import { Comment, CommentTypeEnum } from "./comments/comment.model";
import { currentUserV2, getAccountsFromStorage, setAccountsToStorage,users } from "./useLocalStorage";

const fetchComments = () => {
  return users.map(user => user.getComments()).reduce((a, b) => [...a, ...b], []);
}

const newCommentV2 = (comment: string) => {
  currentUserV2.createComment(comment);
  setAccountsToStorage(users);
  loadComments();
  addCommentBox();
}

const updateCommentV2 = (id:number, changes: string) => {
  currentUserV2.updateComment(id, changes);
  setAccountsToStorage(users);
  loadComments()
  addCommentBox()
}

const deleteCommentV2 = (id:number) => {
  currentUserV2.deleteComment(id);
  setAccountsToStorage(users);
  loadComments()
  addCommentBox()
}

const replyToCommentV2 = (db: Account[], comment: string, userId: Account['id'], commentId: Comment['id']) => {
  currentUserV2.replyToComment(users,comment,userId,commentId);
  setAccountsToStorage(users);
  loadComments();
  addCommentBox();
}

const sortComments = () => {
  // existingComments.sort((a,b) => b.score - a.score);
  // existingCommentsV2.sort((a: any,b: any) => b.score - a.score);
  return fetchComments().sort((a: any,b: any) => b.score - a.score);
}

const generateReplyBox = (container: HTMLElement, userId: number, commentId: number) => {
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
  currentUserPic.src = currentUserV2.profilePic;
  currentUserContainer.appendChild(currentUserPic);

  //send button
  const button = document.createElement('button');
  button.className = 'send__button';
  button.innerText = 'REPLY';
  button.addEventListener('click', () => {
    if(!input.value.length){
      return false
    } else {
      replyToCommentV2(users, input.value, userId, commentId);
    }
  })

  picAndSendBtnContainer.append(currentUserContainer, button);


  addCommentContainer.append(inputContainer,picAndSendBtnContainer);
  return container.after(addCommentContainer);
}

const generateUpdateBox = (container: HTMLElement, updateBtn: HTMLElement, commentId: number, commentText: string) => {
  const textField = document.createElement('input');
  textField.setAttribute('type', 'text');
  textField.className = 'update__field';
  textField.defaultValue = commentText;
  container.appendChild(textField);
  updateBtn.addEventListener('click', () => {
    updateCommentV2(commentId, textField.value);
  })
}

const loadComments = () => {
  App.innerText = '';
  sortComments().forEach((el:Comment) => {
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
      replyContainer.classList.add('disable__btn');
      generateReplyBox(replyScoreContainer, el.user.id, Number(el.id));
    })
    //reply and score container for mobiles
    const replyScoreContainer = document.createElement('div');
    replyScoreContainer.className = 'replyScore__container';
    replyScoreContainer.append(scoreContainer, replyContainer);

     //delete and edit buttons
    if(el.user.username === currentUserV2.name) {

    replyContainer.classList.add('disable');

      const deleteEditBtnContainer = document.createElement('div');
      deleteEditBtnContainer.className = 'deleteEditBtnContainer';
      const deleteBtn = document.createElement('div');
      const deleteBtnImg = document.createElement('img');
      deleteBtnImg.src = deleteIcon;
      deleteBtn.innerText = 'Delete';
      deleteBtn.appendChild(deleteBtnImg);
      deleteBtn.addEventListener('click', () => {
      document.documentElement.scrollTop = 0
      const modalBg = document.createElement('div');
      modalBg.className = 'modal__bg';
      const modalContainer = document.createElement('div');
      modalContainer.className = 'modal';
      const modalInfo = document.createElement('div');
      modalInfo.className = 'modal__info';
      const modalInfoTitle = document.createTextNode(`Delete comment`);
      const modalInfoText = document.createTextNode(`Are you sure you want to delete this comment? This will remove the comment and can't be undone.`);
      const modalInfoTitleContainer = document.createElement('p');
      modalInfoTitleContainer.append(modalInfoTitle)
      const modalInfoTextContainer = document.createElement('p');
      modalInfoTextContainer.append(modalInfoText)
      const modalBtnContainer = document.createElement('div');
      modalBtnContainer.className = 'btn__container';
      const modalNoBtn = document.createElement('div');
      const modalYesBtn = document.createElement('div');

      modalNoBtn.innerText = 'NO, CANCEL';
      modalYesBtn.innerText = 'YES, DELETE';
      modalBtnContainer.append(modalNoBtn, modalYesBtn);
      modalInfo.append(modalInfoTitleContainer, modalInfoTextContainer);
      modalContainer.append(modalInfo, modalBtnContainer);
      App.append(modalBg,modalContainer);

      modalYesBtn.addEventListener('click', () =>  {
        deleteCommentV2(Number(el.id));
      })
      modalNoBtn.addEventListener('click', () => {
        modalBg.className = 'disable';
        modalContainer.className = 'disable';
      })

    });

    const editBtn = document.createElement('div');
    const editBtnImg = document.createElement('img');
    editBtnImg.src = editIcon;
    editBtn.innerText = 'Edit';
    editBtn.appendChild(editBtnImg);
    editBtn.addEventListener('click', () => {
      commentBoxText.innerText = '';
      editBtn.classList.add('send__button');
      editBtn.innerText = 'UPDATE';
      generateUpdateBox(commentBoxText, editBtn, Number(el.id), el.comment);
    })
    deleteEditBtnContainer.append(deleteBtn, editBtn);

    replyScoreContainer.append(deleteEditBtnContainer);

    commentContainer.append(profileInfo,commentBox,replyScoreContainer);


    } else {
      commentContainer.append(profileInfo,commentBox, replyScoreContainer);
    }

    //Después de que todo cargue buscamos replies
    if(el.replies.length >= 1){
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
  currentUserPic.src = currentUserV2.profilePic;
  currentUserContainer.appendChild(currentUserPic);

  //send button
  const button = document.createElement('button');
  button.className = 'send__button';
  button.innerText = 'SEND';
  button.addEventListener('click', () => {
    if(!input.value.length){
      alert('Write something...')
    } else {
      newCommentV2(input.value)
    }
  })

  picAndSendBtnContainer.append(currentUserContainer, button);


  addCommentContainer.append(inputContainer,picAndSendBtnContainer);

  return App.appendChild(addCommentContainer);
}

loadComments();
addCommentBox();
