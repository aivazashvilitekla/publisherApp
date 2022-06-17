import { Component, OnInit } from '@angular/core';
// import { FirestoreService } from 'src/app/services/firestore.service';
import {
  Firestore,
  collectionData,
  collection,
  collectionGroup,
} from '@angular/fire/firestore';
import { finalize, map, Observable, tap } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoadingService } from 'src/app/services/loading.service';
export interface Post {
  content: string;
  id: number;
  img: string;
  status: string;
  title: string;
  date: string;
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
  posts$: any[] | undefined;
  selectedPost: Post | undefined;
  constructor(
    private firestoreService: FirestoreService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.startLoading();
    this.firestoreService
      .getPosts().subscribe(res => {
        this.posts$ = res
        this.loadingService.stopLoading()
      });
  }
  selectPost(post: Post) {
    this.selectedPost = post;
  }
  backToPosts() {
    this.selectedPost = undefined;
  }
}
