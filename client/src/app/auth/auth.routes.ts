import { Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const authRoutes: Routes = [
    {
        path: '',
        component: WelcomeComponent,

    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },

];

export default authRoutes;
