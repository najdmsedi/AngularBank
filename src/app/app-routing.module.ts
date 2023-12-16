import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './component/client/client.component';
import { CompteComponent } from './component/compte/compte.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AuthentificationService } from './service/Authentification/authentification.service';

const routes: Routes = [
  {
    path: 'login',
    pathMatch:'full',
    component: LoginComponent,
    // canDeactivate:[AuthentificationService]
  },
  {
    path: 'client',
    pathMatch:'full',
    component: ClientComponent,
    canActivate: [AuthentificationService]
  },
  {
    path: 'compte',
    pathMatch:'full',
    component: CompteComponent,
    canActivate: [AuthentificationService]
  },

  {
    path: 'home',
    pathMatch:'full',
    component: HomeComponent,
    canActivate: [AuthentificationService]
  },
  
    //default
    {
      path:'**',
      pathMatch:'full',
      redirectTo:'home'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
