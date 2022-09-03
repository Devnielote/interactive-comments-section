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
