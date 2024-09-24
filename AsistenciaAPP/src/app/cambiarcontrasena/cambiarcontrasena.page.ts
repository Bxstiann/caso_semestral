import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.page.html',
  styleUrls: ['./cambiarcontrasena.page.scss'],
})
export class CambiarcontrasenaPage implements OnInit {

  claveActual: string = "";
  nuevaClave: string = "";
  confirmarClave: string = "";
  
  claveTemporal: string = "MiClav3";
  
  constructor(private alertController: AlertController) { }
  
  async onSubmit() {
    if (this.claveActual !== this.claveTemporal){
      this.mostrarMensaje("La contraseña actual es incorrecta");
      return;
    }
  
    if (this.nuevaClave !== this.confirmarClave){
      this.mostrarMensaje("Las contraseñas no coinciden");
      return;
    }
  
    this.claveTemporal = this.nuevaClave;

    this.claveActual = '';
    this.nuevaClave = '';
    this.confirmarClave = '';
  
    this.mostrarMensaje("Clave cambiada correctamente");
  }
  
  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ["Ok"]
    });
  
    await alert.present();
  }

  ngOnInit() {}
}
