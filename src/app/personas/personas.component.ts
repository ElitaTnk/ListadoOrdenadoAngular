import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona';
import { PERSONAS } from '../mock-personas';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  personas = PERSONAS;
  selectedPersona: Persona;

  selectedValue: string = 'id';

  constructor() { }

  ngOnInit() {
  }

  selectionChanged(item) {
    this.selectedValue = item.value;
    this.ordenarPersonas(this.selectedValue);
  }

  onSelect(persona: Persona): void {
    this.selectedPersona = persona;
  }

  ordenarPersonas(sortingProperty = "id") {
    return this.personas.sort((obj1, obj2) => {
      const valueA = obj1[sortingProperty];
      const valueB = obj2[sortingProperty];

      return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
    });
  }

}
