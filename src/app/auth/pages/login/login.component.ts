//PARA GOOGLE
declare global {
  interface Window { google?: any; }
}

//PARA FACEBOOK
declare const FB: any;

import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('googleBtn', { static: true }) googleBtnRef!: ElementRef<HTMLDivElement>;
  private subs = new Subscription();

  ngAfterViewInit(): void {

    // Esperamos a que la librería GSI esté disponible
    this.tryInitGoogleButton();

    // 🔹 Inicialización de Facebook
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: 'TU_APP_ID_DE_FACEBOOK',
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
    };

  }

  private tryInitGoogleButton(retries = 0) {
    const maxRetries = 20;          // número de reintentos
    const retryDelay = 150;         // ms entre reintentos

    if (window.google && window.google.accounts && window.google.accounts.id) {
      // Inicializamos (usa tu client_id real)
      window.google.accounts.id.initialize({
        client_id: '454153580891-na36pqqd3rqo63in0pdh6a4cvub1sog8.apps.googleusercontent.com', // <- reemplaza aquí
        callback: (resp: any) => this.handleGoogleCallback(resp),
      });

      // Renderizamos el botón dentro del elemento referenciado
      const el = this.googleBtnRef?.nativeElement;
      if (el) {
        // Opciones: theme, size, shape, width (notar "width")
        window.google.accounts.id.renderButton(el, {
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          width: "100%"
        });
      } else {
        console.warn('Elemento googleBtn no disponible para renderizar el botón.');
      }
      return;
    }

    // Si no está disponible aún, reintentamos con pequeño delay
    if (retries < maxRetries) {
      setTimeout(() => this.tryInitGoogleButton(retries + 1), retryDelay);
    } else {
      console.error('Google Identity Services no cargó después de varios intentos.');
    }
  }

  private handleGoogleCallback(response: any) {
    // `response.credential` es el ID token de Google (JWT)
    console.log('Google credential (ID token):', response?.credential);

    const idToken = response?.credential;
    if (!idToken) return;

    //ENVIAR AL BACKEND

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  //FACEBBOKK
  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
          console.log('Usuario de Facebook:', userInfo);
          // Aquí podrías enviar los datos al backend
        });
      } else {
        console.warn('Usuario canceló el login de Facebook.');
      }
    }, { scope: 'email,public_profile' });
  }

}
