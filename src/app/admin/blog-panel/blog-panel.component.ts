import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
@Component({
  selector: 'app-blog-panel',
  templateUrl: './blog-panel.component.html',
  styleUrls: ['./blog-panel.component.scss'],
})
export class BlogPanelComponent implements OnInit {
  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;

  postForm: FormGroup | undefined;
  submitted: boolean = false;
  newPost = false;
  posts$: Observable<any[]> | undefined;

  maxId = 0;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private toastrService: ToastrMessagesService
  ) {}
  addNewPost() {
    this.newPost = !this.newPost;
  }
  private _initPostForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      img: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this._initPostForm();
    this.posts$ = this.firestoreService.getPosts().pipe(
      tap(posts => posts.forEach(post => {
        if (this.maxId < post['id']) {
          this.maxId = post['id']
        }
      }))
    );
  }
  deletePost(postId: number) {
    console.log(postId);
  }
  async onSubmit() {
    this.submitted = true;
    if (this.postForm?.valid) {
      const post = this.postForm.value;
      const newPost = await this.firestoreService.addPost({
        content: post.content,
        img: post.img,
        id: this.maxId+1,
        status: post.status,
        title: post.title,
      });
      console.log(newPost);
      this.postForm.reset();
      this.firestoreService.getPosts().subscribe();
    } else {
      this.toastrService.showErrorMessage('გთხოვთ შეავსეთ ყველა ველი.')
    }
  }
}
