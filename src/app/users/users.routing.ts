import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user/user.component';

export const UsersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ListUsersComponent
            },
            {
                path: 'user/:id',
                component: UserComponent
            },
            {
                path: 'create/:id',
                component: UserComponent
            },
        ]
    }
];
