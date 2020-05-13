import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  _filterList: string;
  get filterList(): string{
    return this._filterList;
  }
  set filterList(value: string){
    this._filterList = value;
    this.eventsFiltered = this.filterList ? this.filterEvents(this.filterList) : this.events;
  }

  eventsFiltered: any [];
  events: any = [];
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  /* = [
    {
      EventId: 1,
      Theme: 'Angular',
      Place: 'Lisbon'
    },
    {
      EventId: 2,
      Theme: '.Net Core',
      Place: 'Netherland'
    },
    {
      EventId: 3,
      Theme: 'Node.js',
      Place: 'Brazil'
    }
  ];*/

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEvents();
  }

  filterEvents(filterFor: string): any {
    filterFor = filterFor.toLocaleLowerCase();
    return this.events.filter(
      event => event.theme.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
  }

  removeImage() {
    this.showImage = !this.showImage;
  }

  getEvents(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.events = response;
      this.eventsFiltered = this.events;
    }, error => {
      console.log(error);
    });
  }

}
