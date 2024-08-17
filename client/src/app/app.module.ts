import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//componentes de inicio
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';


// componentes de administrador
import { AdministrarHorarioComponent } from './components/Administrador/administrar-horario/administrar-horario.component';
import { InicioAdministradorComponent } from './components/Administrador/inicio-administrador/inicio-administrador.component';
import { PanelAdministradorComponent } from './components/Administrador/panel-administrador/panel-administrador.component';


// componentes de doctor
import { RegistroCitaComponent } from './components/Doctor/registro-cita/registro-cita.component';
import { PerfilDoctorComponent } from './components/Doctor/perfil-doctor/perfil-doctor.component';
import { PanelDoctorComponent } from './components/Doctor/panel-doctor/panel-doctor.component';
import { InicioDoctorComponent } from './components/Doctor/inicio-doctor/inicio-doctor.component';

//componentes de paciente
import { DatosPacienteComponent } from './components/Paciente/registro-paciente/datos-paciente.component';
import { EdicionDatosComponent } from './components/Paciente/edicion-datos/edicion-datos.component';
import { RegistroCitasPacienteComponent } from './components/Paciente/registro-citas-paciente/registro-citas-paciente.component';
import { PanelPacienteComponent } from './components/Paciente/panel-paciente/panel-paciente.component';
import { InicioPacienteComponent } from './components/Paciente/inicio-paciente/inicio-paciente.component';
import { PerfilPacienteComponent } from './components/Paciente/perfil-paciente/perfil-paciente.component';


// otros componentes
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { FormularioComponent } from './components/formulario/formulario.component';

//-------importsServices----------------------------------------------------------------------------//
import { PacienteService } from './services/paciente.service';
import { DoctorService } from './services/doctor.service';

@NgModule({
  declarations: [
    AppComponent,


    //inicio
    LoginComponent,
    InicioComponent,


    //administrador
    AdministrarHorarioComponent,
    InicioAdministradorComponent,
    PanelAdministradorComponent,

    //doctor
    RegistroCitaComponent,
    PerfilDoctorComponent,
    PanelDoctorComponent,
    InicioDoctorComponent,


    //paciente
    DatosPacienteComponent,
    RegistroCitasPacienteComponent,
    PanelPacienteComponent,
    InicioPacienteComponent,
    EdicionDatosComponent,
    PerfilPacienteComponent,

    //otros
    RecordatoriosComponent,
    FormularioComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    PacienteService, //este servicio tendrá todos los metodos para los datos
    DoctorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
