import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, getFirestore , addDoc, deleteDoc, doc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../pages/blog/blog.component';
import { db } from '../shared/utils/helpers.fn';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(private firestore: Firestore) {}
  getPosts() {
    const collect = collection(this.firestore, 'posts');
    return collectionData(collect);
  }
  addPost(body: Post) {
    const docRef = addDoc(collection(db, "posts"), body);
    console.log(docRef);
  }
  // deletePost(postId: number) {
  //   deleteDoc(doc(db, "posts", ''));
  //   // db.collection("people").doc(id).delete();
  //   // let fs = firebase.firestore();
  //   // let collectionRef = fs.collection('posts');
  //   // const doc =  this.noteRef.where('id', '==', postId).get();
  //   // doc.forEach((element: any) => {
  //   //     element.ref.delete();
  //   //     console.log(`deleted: ${element.id}`);
  //   // });
  //   var bla = db.collection('posts').where('id','==',postId);
  //   bla.get().then((res:any) => {
  //     res.forEach((doc: any)=>doc.ref.delete());
  //   });

  // }
}
