export class Persona {
  id: number;
  nombre: string;
  apellido: string;
  direccion: {
    calleAltura: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
    pais: string,
  }
}
