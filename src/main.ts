// Función para generar comentarios principales
//     Que esa función tenga un método para responder a ese comentario

// Función para generar respuestas a comentarios.

// Una clase que genere la caja de comentarios, con sus métodos de responder | like | eliminar | editar

//Usar interfaces de TS para cada usuario y comentario

//Crear una interface base que deben respetar todos los usuarios y comentarios que se generen.

import * as data from "../data.json";
import { User } from './users/user.model';
import { createComment, updateComment, replyToComment, DeleteComment, existingComments } from "./comments/comment.services";


// Pasar esto a su UserDto
// const yourUser:User = {
//   user : data.currentUser.username,
//   image : data.currentUser.image,
// }

// Pasar esto a su UserDto

// data.comments.forEach(el => {
//   createComment(el)
// });

//TODO: Definir la interface de user que recibira la interface de Comment
const loadComments = () => {
  data.comments.forEach(comment => {
    createComment(comment);
  })
}


loadComments();
createComment(
  {id: 5,
  comment: 'Hello there, just wanted to say: aquí es pizzas castillo?',
  createdAt: '1 minute ago',
  score: 10,
  user:{
  "image": {
    "png": "./images/avatars/image-amyrobson.png",
    "webp": "./images/avatars/image-amyrobson.webp"
  },
  "username": "Daniel Flores"
},
replies: []
})
updateComment(1,'Lol, u gay');
replyToComment(existingComments[0].id,
  {
    id: 1.1,
    comment: "Yo, shut the fuck up",
    createdAt: "2 weeks ago",
    score: 10,
    user: {
      "image": {
        "png": "./images/avatars/image-amyrobson.png",
        "webp": "./images/avatars/image-amyrobson.webp"
      },
      "username": "Daniel Flores"
    },
  })
  console.log(existingComments);

