import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchTriggered = new EventEmitter<string>();

  onSearch() {
    this.searchTextChange.emit(this.searchText);
    if (this.searchText.trim().length >= 3) {
      this.searchTriggered.emit(this.searchText.trim());
    }
  }

}