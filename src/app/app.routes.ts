import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
    { path: 'loguin', component: LoginComponent },

    { path: '', redirectTo: '/loguin', pathMatch: 'full' }
];
