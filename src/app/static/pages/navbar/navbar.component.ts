import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuActive = false;
  hoverTimer: any;

  activate() {
    clearTimeout(this.hoverTimer);
    this.menuActive = true;
  }

  deactivate() {
    // Pequeño retardo para que no desaparezca bruscamente
    this.hoverTimer = setTimeout(() => {
      this.menuActive = false;
    }, 300);
  }

  onMouseEnter() {
    this.activate();
  }

  onMouseLeave() {
    this.deactivate();
  }
}
