import scoreUpIcon from './images/icon-plus.svg';
import scoreDownIcon from './images/icon-minus.svg';
import replyIcon from './images/icon-reply.svg';
import deleteIcon from './images/icon-delete.svg';
import editIcon from './images/icon-edit.svg';
import TimeDiff from 'js-time-diff';
import { Comment } from "./comments/comment.model";
import { Account } from './accounts/Account';
import { currentUserV2, users } from './useLocalStorage';

export const getRandomId = () => {
  return Math.floor(Math.random() * Date.now());
};

const fetchComments = () => {
  return users.map(user => user.getComments()).reduce((a, b) => [...a, ...b], []);
}

const sortComments = () => {
  // existingComments.sort((a,b) => b.score - a.score);
  // existingCommentsV2.sort((a: any,b: any) => b.score - a.score);
  return fetchComments().sort((a: any,b: any) => b.score - a.score);
}

// const replyToCommentV2 = (db: Account[], comment: string, userId: Account['id'], commentId: Comment['id']) => {
//   currentUserV2.replyToComment(users,comment,userId,commentId);
//   setAccountsToStorage(users);
//   loadComments();
//   addCommentBox();
// }

// const generateReplyBox = (container: HTMLElement, userId: number, commentId: number) => {
//   const addCommentContainer = document.createElement('div');
//   addCommentContainer.classList.add('comment__container');
//   addCommentContainer.classList.add('currentUser__container');

//   //current user comment box
//   const inputContainer = document.createElement('div');
//   inputContainer.className = 'currentUser__commentBox'
//   const input = document.createElement('input');
//   input.id = 'inputValue';
//   input.type = 'text';
//   input.placeholder = 'Add a comment...';
//   inputContainer.appendChild(input);

//   //Container for pic and send button in mobiles
//   const picAndSendBtnContainer = document.createElement('div');
//   picAndSendBtnContainer.className = 'profileAndBtn__container';

//   //current user profile pic
//   const currentUserContainer = document.createElement('div');
//   currentUserContainer.className = 'comment__profile';
//   const currentUserPic = document.createElement('img');
//   currentUserPic.src = currentUserV2.profilePic;
//   currentUserContainer.appendChild(currentUserPic);

//   //send button
//   const button = document.createElement('button');
//   button.className = 'send__button';
//   button.innerText = 'REPLY';
//   button.addEventListener('click', () => {
//     if(!input.value.length){
//       return false
//     } else {
//       replyToCommentV2(users, input.value, userId, commentId);
//     }
//   })

//   picAndSendBtnContainer.append(currentUserContainer, button);


//   addCommentContainer.append(inputContainer,picAndSendBtnContainer);
//   return container.after(addCommentContainer);
// }

// const generateUpdateBox = (container: HTMLElement, updateBtn: HTMLElement, commentId: number, commentText: string) => {
//   const textField = document.createElement('input');
//   textField.setAttribute('type', 'text');
//   textField.className = 'update__field';
//   textField.defaultValue = commentText;
//   container.appendChild(textField);
//   updateBtn.addEventListener('click', () => {
//     updateCommentV2(commentId, textField.value);
//   })
// }
