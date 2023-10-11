import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { PlayersDetailComponent } from './players-detail/players-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },  
  { path: 'players', component: PlayersComponent },
  { path: 'detail/:id', component: PlayersDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
