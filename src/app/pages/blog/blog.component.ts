import { Component, OnInit } from '@angular/core';
// import { FirestoreService } from 'src/app/services/firestore.service';
import {
  Firestore,
  collectionData,
  collection,
  collectionGroup,
} from '@angular/fire/firestore';
import { map, Observable, tap } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
export interface Post {
  content: string;
  id: number;
  img: string;
  status: string;
  title: string;
}
interface DocumentData {
  bookingMap: Record<number, Post[]>;
  length: number;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  posts$: Observable<any[]> | undefined;
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.posts$ = this.firestoreService.getPosts();
  }
  
}
