import { DataService } from './services/data.service';
import { AppErrorHandler } from './common/app-error-handler';
import { PostService } from './services/post.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { PostsComponent } from './components/posts/posts.component';

@NgModule({
  declarations: [AppComponent, SignupFormComponent, PostsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    PostService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
