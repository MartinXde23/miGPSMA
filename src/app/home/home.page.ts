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
  IonButton,
  IonInput
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonInput
  ],
})
export class HomePage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  url: string | null = null;
  nombre: string = '';

  constructor(private firestore: Firestore) { }

  async ngOnInit() {
    await Geolocation.requestPermissions();
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.url = `https://www.google.com.ar/maps/@${this.latitude},${this.longitude}`;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
  abrirMapa() {
    if (this.url) {
      window.open(this.url, '_blank');
    }
  }
  async guardarEnFirebase() {
    if (!this.nombre || !this.url) {
      alert('Por favor completa tu nombre y asegúrate de que haya una URL válida.');
      return;
    }
    try {
      const ubicacionesRef = collection(this.firestore, 'ubicaciones');
      await addDoc(ubicacionesRef, {
        nombre: this.nombre,
        url: this.url,
        tiempoCreacion: new Date()
      });
      alert('Ubicación guardada correctamente');
      this.nombre = '';
    } catch (error) {
      console.error('Error guardando en Firebase:', error);
      alert('Error al guardar');
    }
  }
}