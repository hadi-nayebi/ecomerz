import { PostService } from './../../services/post.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BadInputError } from 'src/app/common/bad-input-error';
import { NotFoundError } from 'src/app/common/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: any;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe({
      next: (response) => {
        this.posts = response;
      },
    });
  }

  createPost(input: HTMLInputElement) {
    if (input.value !== '') {
      let post: any = {
        title: input.value,
      };
      input.value = '';
      this.postService.create(post).subscribe({
        next: (response: any) => {
          post.id = response.id;
          this.posts.splice(0, 0, post);
        },
        error: (error: Response) => {
          if (error instanceof BadInputError) {
            // this.posts.setError(error.json());
          } else throw error;
        },
      });
    }
  }

  updatePost(post: any) {
    this.postService.update(post).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  deletePost(post: any) {
    this.postService.delete(345).subscribe({
      next: (response) => {
        console.log(response);
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      error: (error: Response) => {
        if (error instanceof NotFoundError)
          alert('This post has already been deleted.');
        else throw error;
      },
    });
  }
}
