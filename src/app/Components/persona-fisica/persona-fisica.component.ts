import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { PersonaFisicaService } from 'src/app/Services/persona-fisica.service';

@Component({
  selector: 'persona-fisica',
  templateUrl: './persona-fisica.component.html',
  styleUrls: ['./persona-fisica.component.css']
})
export class PersonaFisicaComponent implements OnInit {
  listapersonas: any[] =[];
  accion = 'Agregar'
  persona: any;
  id: number | undefined;

  form: FormGroup;

  constructor( private fb:FormBuilder,
    private toastr: ToastrService,
    private _PersonaFisicaService: PersonaFisicaService ) { 
    this.form = this.fb.group({
      fecharegistro:['',Validators.required],
      IdPersonaFisica:[''],
      fechaactualizacion:[''],
      nombre:['',[Validators.required,Validators.maxLength(50)]],
      apellidopaterno:['',[Validators.required,Validators.maxLength(50)]],
      apellidomaterno:['',[Validators.required,Validators.maxLength(50)]],
      rfc:['',[Validators.required,Validators.minLength(13)]],
      fechanacimiento:['',Validators.required],
      usuarioagrega:[''],
      activo:['']
    })
  }

  ngOnInit(): void {
    this.GetPersonas();
  }

  GetPersonas(){
    this._PersonaFisicaService.getListPersonas().subscribe(data => {
        this.listapersonas = data;
    })
  }

  ObtenerPersonaid(id:number){
    this._PersonaFisicaService.ObtenerPersonaId(id).subscribe(data =>{
      this.persona = data;
    })
  }

  GuardarPersona(){
  
    const persona: any = {
      nombre: this.form.get('nombre')?.value,
      apellidopaterno: this.form.get('apellidopaterno')?.value,
      apellidomaterno: this.form.get('apellidomaterno')?.value,
      rfc: this.form.get('rfc')?.value,
      fechanacimiento: this.form.get('fechanacimiento')?.value
      
    }

    console.log(persona);
    if(this.id == undefined){
      //Agregar
      this._PersonaFisicaService.savePersona(persona).subscribe(data => {
        this.toastr.success("Persona Registrada Con exito","Persona Registrada");
        this.GetPersonas();
        this.form.reset();
      },error =>{
        console.log(error);
      });

    }else{
      persona.idpersonafisica = this.id;
      //Editar
      this._PersonaFisicaService.actualizarPersona(this.id, persona).subscribe(data =>{
        this.form.reset();
        this.accion = 'agregar';
        this.id = undefined;
        this.toastr.info('Persona Actializada con exito','Persona Actualizada')
      })
    }

    
  }

  EliminarPersona(id: number){
    this._PersonaFisicaService.deletePersona(id).subscribe(data => {
      this.toastr.error("Persona Eliminada con Exito","Persona Eliminada");
      this.GetPersonas();
    }
    )
  }

  EditarPersona(persona: any){
    console.log(persona)
    this.accion = 'Editar';
    this.id = persona.idPersonaFisica;
    console.log(this.id);

    this.form.patchValue({
      nombre: persona.nombre,
      apellidopaterno: persona.apellidoPaterno,
      apellidomaterno: persona.apellidoMaterno,
      rfc: persona.rfc,
      fechanacimiento: persona.fechaNacimiento,
      fechactualizacion: "Hoy"
    });
  }

}
