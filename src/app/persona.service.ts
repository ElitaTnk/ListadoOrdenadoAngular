import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { Persona } from './persona';
import { PERSONAS } from './mock-personas';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) {}

  private listasUrl = 'https://my-json-server.typicode.com/ElitaTnk/ListadoOrdenado/';


  getPersonasAB() {
    const A = this.http.get(this.listasUrl + 'listPersonaA');
    const B = this.http.get(this.listasUrl + 'listPersonaB');

    return forkJoin(A, B)
     .pipe(
      map(responses => {
        return [].concat(...responses);
     }));
  }

  getDireccionC() {
    return this.http.get(this.listasUrl + 'listaDireccionC');
  }

  getDireccionD() {
    return this.http.get(this.listasUrl + 'listaDireccionD');
  }

  getCP() {
    return this.http.get(this.listasUrl + 'listaCP');
  }

  listaPPP: Persona[];

  getPersonas():  Observable<Persona[]> {
    this.getPersonasAB().subscribe((personas) => {console.log('aaa', personas); this.listaPPP = personas});
    console.log(this.listaPPP, 'asassa');
    let personas = this.limpiarLista(this.listaPPP);
    return this.getPersonasAB();//this.armarListado(personas);
  }

  // default
  F = {
    "calle": "Calle Falsa",
    "altura": "123",
    "ciudad": "Azul",
    "provincia": "Buenos Aires",
    "pais": "Argentina",
  };

  checkYAgregar(persona, arr) {
    const found = arr.some(function (el) {
      return el.nombre === persona.nombre && el.apellido === persona.apellido;
    });
    if (!found) { arr.push({...persona}); }
  }

  limpiarLista(listaPersonas) {
    let finalLista = [];
    console.log(listaPersonas, 'SSDDDD');
    listaPersonas.forEach(function(element) {
      this.checkYAgregar(element,finalLista)
    });

    return finalLista;
  }

  armarListado(personas) {
    interface Direccion {
      codigoPostal?: string;
      calleAltura?: string;
      pais: string;
      ciudad: string;
      altura?: string;
      calle?: string;
      personaId?: string;
    }

    return personas.pipe(map(persona => {
      let direccion : Direccion = this.buscarDireccion(persona);
      const codigoPostal = this.buscarCP(direccion);

      direccion.codigoPostal = codigoPostal ? codigoPostal.codigoPostal : null;
      direccion.calleAltura = direccion.calle + direccion.altura;
      delete direccion.calle;
      delete direccion.altura;
      delete direccion.personaId;

      persona.direccion = direccion;

      return persona;
    }));
  }

  ordenarPersonas(personas, sortingProperty = "id") {
    return personas.sort((obj1, obj2) => {
      const valueA = obj1[sortingProperty];
      const valueB = obj2[sortingProperty];

      return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
    });
  }

  buscarDireccion(persona) {
    const c = this.getDireccionC();
    const d = this.getDireccionD();
    return c.find(p => p.personaId == persona.id) || d.find(p => p.personaId == persona.id) || this.F;
  }

  buscarCP(direccion) {
    const e = this.getCP();
    return e.find(dir => {
      return dir.calle === direccion.calle && dir.ciudad === direccion.ciudad && dir.provincia === direccion.provincia;
    });
  }

}
