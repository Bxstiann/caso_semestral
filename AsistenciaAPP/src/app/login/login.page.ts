import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  public alertButtons = [{
    text: 'Restablecer contraseña',
    handler: (data: any) => {
      if (data && data.user) {
        this.enviarMensaje(data.user);
      }
    }
  }];
  async restablecerContrasena() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      inputs: [
        {
          name: 'user',
          type: 'text',
          placeholder: 'Nombre de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Restablecer',
          handler: (data) => {
            if (data.user) {
              this.enviarMensaje(data.user);
            } else {
              console.log('No se ingresó nombre de usuario');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  public alertInputs = [
    {
      name: "nombreUsuario",
      type: "text",
      placeholder: 'Nombre de usuario',
    }
  ];

  user: string = "";
  pswd: string = "";

  usuarioTest: string = "Usuario1";
  claveTest: string = "MiClav3";

  constructor(
    private alertController: AlertController, 
    private router: Router
  ) { }

  async onSubmit() {
    if (this.user === this.usuarioTest && this.pswd === this.claveTest) {
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión Exitoso',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos, intente nuevamente.',
        buttons: ['Ok']
      });

      await alert.present();
    }
  }

  async enviarMensaje(user: string) {
    const mensaje = `Se ha enviado un mail al correo asociado al usuario: ${user}`;
    await this.mostrarMensaje(mensaje);
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: "Mail enviado",
      message: mensaje,
      buttons: ["Ok"]
    });

    await alert.present();
  }
}
