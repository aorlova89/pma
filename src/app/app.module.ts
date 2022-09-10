import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardsListPageComponent } from './pages/boards-list-page/boards-list-page.component';
import { PmaHeaderComponent } from './components/pma-header/pma-header.component';
import { PmaFooterComponent } from './components/pma-footer/pma-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import {MatCardModule} from "@angular/material/card";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppEffects} from "./store/effects/pma.effects";
import {appReducer} from "./store/reducers/pma.reducer";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { AddBoardCardComponent } from './components/add-board-card/add-board-card.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatMenuModule} from "@angular/material/menu";
import { ModalComponent } from './components/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { BoardDetailsPageComponent } from './pages/board-details-page/board-details-page.component';
import { ColumnComponent } from './components/column/column.component';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddColumnDialogComponent } from './components/add-column-dialog/add-column-dialog.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";


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
    AddTaskDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        // StoreModule.forFeature('pma', appReducer),
        StoreModule.forRoot({pma: appReducer}),
        EffectsModule.forRoot([AppEffects]),
        EffectsModule.forFeature([AppEffects]),
        RouterModule.forRoot([
            {path: '', redirectTo: '/welcome', pathMatch: 'full'},
            {path: 'welcome', component: WelcomeComponent},
            {path: 'edit', component: EditProfileComponent},
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
            {path: 'boards', component: BoardsListPageComponent},
            {path: 'boards/:board', component: BoardDetailsPageComponent}
        ]),
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
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
