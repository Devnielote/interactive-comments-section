"use strict";
exports.__esModule = true;
// import * as data from "./data.json";
// import { User } from './users/user.model';
var comment_services_1 = require("./comments/comment.services");
var faker_1 = require("@faker-js/faker");
var nodes_1 = require("./nodes");
var icon_plus_svg_1 = require("./images/icon-plus.svg");
var icon_minus_svg_1 = require("./images/icon-minus.svg");
var icon_reply_svg_1 = require("./images/icon-reply.svg");
var icon_delete_svg_1 = require("./images/icon-delete.svg");
var icon_edit_svg_1 = require("./images/icon-edit.svg");
var js_time_diff_1 = require("js-time-diff");
var generateComment = function () {
    (0, comment_services_1.createComment)({
        id: faker_1.faker.datatype.uuid(),
        comment: faker_1.faker.lorem.paragraph(),
        createdAt: faker_1.faker.date.past(),
        score: faker_1.faker.datatype.number({
            'min': 1,
            'max': 20
        }),
        user: {
            "image": faker_1.faker.image.avatar(),
            "username": faker_1.faker.name.firstName()
        },
        replies: []
    });
};
var newComment = function (comment) {
    (0, comment_services_1.createComment)({
        id: faker_1.faker.datatype.uuid(),
        comment: comment,
        createdAt: new Date(),
        score: faker_1.faker.datatype.number({
            'min': 1,
            'max': 20
        }),
        user: {
            "image": comment_services_1.currentUser.image,
            "username": comment_services_1.currentUser.username
        },
        replies: []
    });
    loadComments();
    addCommentBox();
};
var replyToComment = function (id, comment) {
    if (!id) {
        console.log('Comment not found');
    }
    else {
        (0, comment_services_1.reply)(id, {
            id: faker_1.faker.datatype.uuid(),
            comment: comment,
            createdAt: new Date(),
            score: 0,
            user: {
                "image": comment_services_1.currentUser.image,
                "username": comment_services_1.currentUser.username
            }
        });
    }
};
var update = function (id, newComment) {
    var index = comment_services_1.existingComments.findIndex(function (el) { return el.id === id; });
    var commentToUpdate = comment_services_1.existingComments[index];
    if (commentToUpdate.user.username === 'Daniel') {
        (0, comment_services_1.updateComment)(id, newComment);
    }
    else {
        console.log("You only can update your own comments");
    }
};
var deleteComment = function (id) {
    var index = comment_services_1.existingComments.findIndex(function (el) { return el.id === id; });
    var commentToDelete = comment_services_1.existingComments[index];
    if (commentToDelete.user.username === 'Daniel') {
        (0, comment_services_1.eraseComment)(id);
    }
    else {
        console.log('You only can delete your own comments');
    }
};
var addCommentsToArray = function () {
    for (var i = 0; i < 4; i++) {
        generateComment();
    }
};
var loadComments = function () {
    nodes_1.App;
    comment_services_1.existingComments.forEach(function (el) {
        var date = (0, js_time_diff_1["default"])(el.createdAt, new Date()).toString();
        var commentContainer = document.createElement('div');
        commentContainer.className = 'comment__container';
        // profileInfo es el div que contiene la profilePic, username y fecha del comentario
        var profileInfo = document.createElement('div');
        profileInfo.className = 'comment__profile';
        var profilePic = document.createElement('img');
        profilePic.src = el.user.image;
        var profileUserName = document.createElement('p');
        var profileUserNameText = document.createTextNode("".concat(el.user.username));
        profileUserName.appendChild(profileUserNameText);
        var commentDate = document.createElement('p');
        var commentDateText = document.createTextNode(date);
        commentDate.appendChild(commentDateText);
        profileInfo.append(profilePic, profileUserName, commentDate);
        //Dentro de comment box guardamos el comentario
        var commentBox = document.createElement('div');
        commentBox.className = 'comment__box';
        var commentBoxText = document.createElement('p');
        commentBoxText.innerText = "".concat(el.comment);
        commentBox.appendChild(commentBoxText);
        //score
        var scoreContainer = document.createElement('div');
        scoreContainer.className = 'score__container';
        var score = document.createElement('span');
        score.innerText = "".concat(el.score);
        var scoreUp = document.createElement('img');
        scoreUp.src = "".concat(icon_plus_svg_1["default"]);
        var scoreDown = document.createElement('img');
        scoreDown.src = "".concat(icon_minus_svg_1["default"]);
        scoreContainer.append(scoreUp, score, scoreDown);
        //reply
        var replyContainer = document.createElement('div');
        replyContainer.className = 'reply__container';
        var reply = document.createElement('img');
        reply.src = "".concat(icon_reply_svg_1["default"]);
        var replyText = document.createElement('span');
        replyText.innerText = 'Reply';
        replyContainer.append(reply, replyText);
        replyContainer.addEventListener('click', function () {
            addCommentBox();
        });
        //reply and score container for mobiles
        var replyScoreContainer = document.createElement('div');
        replyScoreContainer.className = 'replyScore__container';
        replyScoreContainer.append(scoreContainer, replyContainer);
        //delete and edit buttons
        if (el.user.username === comment_services_1.currentUser.username) {
            replyContainer.classList.add('disable');
            var deleteEditBtnContainer = document.createElement('div');
            deleteEditBtnContainer.className = 'deleteEditBtnContainer';
            var deleteBtn = document.createElement('div');
            var deleteBtnImg = document.createElement('img');
            deleteBtnImg.src = icon_delete_svg_1["default"];
            deleteBtn.innerText = 'Delete';
            deleteBtn.appendChild(deleteBtnImg);
            var editBtn = document.createElement('div');
            var editBtnImg = document.createElement('img');
            editBtnImg.src = icon_edit_svg_1["default"];
            editBtn.innerText = 'Edit';
            editBtn.appendChild(editBtnImg);
            deleteEditBtnContainer.append(deleteBtn, editBtn);
            replyScoreContainer.append(deleteEditBtnContainer);
            commentContainer.append(profileInfo, commentBox, replyScoreContainer);
        }
        else {
            commentContainer.append(profileInfo, commentBox, replyScoreContainer);
        }
        nodes_1.App.appendChild(commentContainer);
    });
};
var addCommentBox = function () {
    var addCommentContainer = document.createElement('div');
    addCommentContainer.classList.add('comment__container');
    addCommentContainer.classList.add('currentUser__container');
    //current user comment box
    var inputContainer = document.createElement('div');
    inputContainer.className = 'currentUser__commentBox';
    var input = document.createElement('input');
    input.id = 'inputValue';
    input.type = 'text';
    input.placeholder = 'Add a comment...';
    inputContainer.appendChild(input);
    //Container for pic and send button in mobiles
    var picAndSendBtnContainer = document.createElement('div');
    picAndSendBtnContainer.className = 'profileAndBtn__container';
    //current user profile pic
    var currentUserContainer = document.createElement('div');
    currentUserContainer.className = 'comment__profile';
    var currentUserPic = document.createElement('img');
    currentUserPic.src = comment_services_1.currentUser.image;
    currentUserContainer.appendChild(currentUserPic);
    //send button
    var button = document.createElement('button');
    button.className = 'send__button';
    button.innerText = 'SEND';
    button.addEventListener('click', function () {
        if (!input.value.length) {
            alert('Write something...');
        }
        else {
            nodes_1.App.innerText = '';
            newComment(input.value);
        }
    });
    picAndSendBtnContainer.append(currentUserContainer, button);
    addCommentContainer.append(inputContainer, picAndSendBtnContainer);
    nodes_1.App.appendChild(addCommentContainer);
};
addCommentsToArray();
loadComments();
addCommentBox();
