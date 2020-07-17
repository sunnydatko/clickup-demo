import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [
    {
      name: 'Conor McGregor',
      city: 'San Diego',
      state: 'CA',
      title: 'Sales Consultant',
    },
    {
      name: 'Tony Ferguson',
      city: 'Denver',
      state: 'CO',
      title: 'CEO',
    },
    {
      name: 'Max Holloway',
      city: 'Los Angeles',
      state: 'CA',
      title: 'Graphic Artist',
    },
    {
      name: 'Jonathan Jones',
      city: 'Sacramento',
      state: 'CA',
      title: 'Marketing Manager',
    },
    {
      name: 'Daniel Cormier',
      city: 'Boise',
      state: 'ID',
      title: 'Sales Director',
    },
    {
      name: 'Brock Lesnar',
      city: 'Seattle',
      state: 'WA',
      title: 'Sales Consultant',
    },
    {
      name: 'Cynthia Llamar',
      city: 'Portland',
      state: 'OR',
      title: 'Marketing Director',
    },
    {
      name: 'Alex Green',
      city: 'New York',
      state: 'NY',
      title: 'Consultant',
    },
    {
      name: 'Pamela Scott',
      city: 'San Diego',
      state: 'CA',
      title: 'Marketing Coordinator',
    },
    {
      name: 'Ashley Partridge',
      city: 'San Diego',
      state: 'CA',
      title: 'Designer',
    },
    {
      name: 'Eva Roberts',
      city: 'Phoenix',
      state: 'AZ',
      title: 'Office Manager',
    },
    {
      name: 'Juan Rodriguez',
      city: 'Phoenix',
      state: 'AZ',
      title: 'Designer',
    },
    {
      name: 'Jordan Robinson',
      city: 'San Fransisco',
      state: 'CA',
      title: 'UX Engineer',
    },
  ];
  constructor() {}

  get() {
    return of(this.users);
  }
}
