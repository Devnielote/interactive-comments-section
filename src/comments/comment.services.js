"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.eraseComment = exports.reply = exports.updateComment = exports.createComment = exports.currentUser = exports.existingComments = void 0;
var faker_1 = require("@faker-js/faker");
exports.existingComments = [];
exports.currentUser = {
    image: faker_1.faker.image.avatar(),
    username: 'You'
};
var createComment = function (data) {
    var newComment = __assign({}, data);
    exports.existingComments.push(newComment);
    return newComment;
};
exports.createComment = createComment;
var updateComment = function (id, changes) {
    var index = exports.existingComments.findIndex(function (el) { return el.id === id; });
    var prevComment = exports.existingComments[index];
    prevComment.comment = changes;
    return exports.existingComments[index];
};
exports.updateComment = updateComment;
var reply = function (id, reply) {
    var _a;
    var index = exports.existingComments.findIndex(function (el) { return el.id === id; });
    var replyingTo = exports.existingComments[index];
    reply.replyingToUser = replyingTo.user.username;
    (_a = replyingTo.replies) === null || _a === void 0 ? void 0 : _a.push(reply);
    return exports.existingComments[index];
};
exports.reply = reply;
var eraseComment = function (id) {
    var index = exports.existingComments.findIndex(function (el) { return el.id === id; });
    if (index > -1) {
        exports.existingComments.splice(index, 1);
    }
    return exports.existingComments;
};
exports.eraseComment = eraseComment;
