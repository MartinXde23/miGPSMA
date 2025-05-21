import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ],
})
export class HomePage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  url: string | null = null;

  async ngOnInit() {
    // Solicita permisos de ubicación
    await Geolocation.requestPermissions();
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.url = `https://www.google.com.ar/maps/@${this.latitude},${this.longitude}`
      window.open(this.url,"_blank")
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
}