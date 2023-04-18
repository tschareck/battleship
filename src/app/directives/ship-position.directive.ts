import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[shipPositionInput]'
})
export class ShipPositionDirective {

  @HostListener('input', ['$event'])
  onUserInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const regex = /^[a-jA-J](10|[1-9])?$/;
    if (!regex.test(inputElement.value)) {
      inputElement.value = inputElement.value.slice(0, -1);
    }
  }
}