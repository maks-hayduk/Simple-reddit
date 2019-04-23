import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './pages/main/main.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminPostComponent } from './admin/admin-post/admin-post.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './shared/pipes/search.pipe';
import { UserPostsPipe } from './shared/pipes/user-posts.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    MainComponent,
    AdminComponent,
    AdminUserComponent,
    AdminPostComponent,
    SearchPipe,
    UserPostsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
