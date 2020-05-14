import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../_services/event.service';
import { Event } from '../_models/Event';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ukLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('pt-PT', ukLocale);

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsFiltered: Event[];
  events: Event[];
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  _filterList = '';

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) { 
      this.localeService.use('pt-PT');
  }

  get filterList(): string{
    return this._filterList;
  }
  set filterList(value: string){
    this._filterList = value;
    this.eventsFiltered = this.filterList ? this.filterEvents(this.filterList) : this.events;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.validation();
    this.getEvents();
  }

  filterEvents(filterFor: string): Event[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.events.filter(event => {
      return event.theme.toLocaleLowerCase().includes(filterFor)
    });
  }

  removeImage() {
    this.showImage = !this.showImage;
  }

  validation(){
    this.registerForm = this.fb.group({
      theme: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      place: ['', Validators.required],
      dateEvent: ['', Validators.required],
      imageUrl: ['', Validators.required],
      qtdPerson: ['', [Validators.required, Validators.max(200000)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  saveChange(){

  }

  getEvents(){
    this.eventService.getAllEvent().subscribe(
      (_events: Event[]) => {
      this.events = _events;
      this.eventsFiltered = this.events;
      console.log(_events);
    }, error => {
      console.log(error);
    });
  }

}
