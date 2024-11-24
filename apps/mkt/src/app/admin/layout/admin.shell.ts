import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SidebarLink {
  name: string;
  path: string;
}

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.shell.html',
})
export class AdminShell {
  links: SidebarLink[] = [
    { name: 'Dashboard', path: './' },
    { name: 'Tournament', path: './tournament' },
  ];
}
