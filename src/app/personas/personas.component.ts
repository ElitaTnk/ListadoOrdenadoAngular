import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})

export class PersonasComponent implements OnInit {
  listaPersonas: Persona[];
  selectedPersona: Persona;

  selectedValue: string = 'id';

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getPersonas()
      .subscribe((personas: Persona[]) => {console.log(personas); this.listaPersonas = personas});
  }

  selectionChanged(item) {
    this.selectedValue = item.value;
    this.ordenarPersonas(this.selectedValue);
  }

  onSelect(persona: Persona): void {
    this.selectedPersona = persona;
  }

  ordenarPersonas(sortingProperty = "id") {
    return this.listaPersonas.sort((obj1, obj2) => {
      const valueA = obj1[sortingProperty];
      const valueB = obj2[sortingProperty];

      return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
    });
  }

}
