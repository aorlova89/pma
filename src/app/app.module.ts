import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardsListPageComponent} from './pages/boards-list-page/boards-list-page.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {EditProfileComponent} from './pages/edit-profile/edit-profile.component';
import {BoardDetailsPageComponent} from './pages/board-details-page/board-details-page.component';
import {PmaHeaderComponent} from './components/pma-header/pma-header.component';
import {PmaFooterComponent} from './components/pma-footer/pma-footer.component';
import {BoardsListComponent} from './components/boards-list/boards-list.component';
import {BoardCardComponent} from './components/board-card/board-card.component';
import {AddBoardCardComponent} from './components/add-board-card/add-board-card.component';
import {ModalComponent} from './components/modal/modal.component';
import {ColumnComponent} from './components/column/column.component';
import {ColumnsListComponent} from './components/columns-list/columns-list.component';
import {AddColumnDialogComponent} from './components/add-column-dialog/add-column-dialog.component';
import {AddTaskDialogComponent} from './components/add-task-dialog/add-task-dialog.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';

import {AppEffects} from "./store/effects/pma.effects";
import {appReducer} from "./store/reducers/pma.reducer";
import {globalReducer} from "./store/reducers/global.reducer";
import {AuthGuard} from "./auth.guard";
import {ApiInterceptor} from "./api.interceptor";
import {JwtInterceptor} from "./jwt.interceptor";
import {environment} from "../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    BoardsListPageComponent,
    PmaHeaderComponent,
    PmaFooterComponent,
    BoardsListComponent,
    BoardCardComponent,
    AddBoardCardComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    ModalComponent,
    EditProfileComponent,
    BoardDetailsPageComponent,
    ColumnComponent,
    ColumnsListComponent,
    AddColumnDialogComponent,
    AddTaskDialogComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    StoreModule.forRoot({pma: appReducer, app: globalReducer}),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([AppEffects]),
    RouterModule.forRoot([
      {path: '', redirectTo: '/welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'edit', component: EditProfileComponent, canActivate: [AuthGuard]},
      {path: 'boards', component: BoardsListPageComponent, canActivate: [AuthGuard]},
      {path: 'boards/:board', component: BoardDetailsPageComponent, canActivate: [AuthGuard]}
    ]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    StoreDevtoolsModule,
    MatTooltipModule,
    DragDropModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
