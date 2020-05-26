import { SocialNetwork } from './../../_models/SocialNetwork';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import {Event} from 'src/app/_models/Event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './eventEdit.component.html',
  styleUrls: ['./eventEdit.component.css']
})
export class EventEditComponent implements OnInit {

  title = 'Edit event';
  event: Event = new Event();
  imageUrl = 'assets/img/upload.png';
  file: File;
  fileNameToUpdate: string;
  registerForm: FormGroup;
  currentDate = '';

  get lots(): FormArray {
    return  this.registerForm.get('lots') as FormArray;
  }

  get socialNetworks(): FormArray {
    return  this.registerForm.get('socialNetworks') as FormArray;
  }

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute
    ) {
      this.localeService.use('en-us');
  }

  ngOnInit() {
    this.validation();
    this.loadingEvent();
  }

  loadingEvent(){
    const idEvent = +this.router.snapshot.paramMap.get('id');
    this.eventService.getEventById(idEvent).subscribe(
      (event: Event) => {
        this.event = Object.assign({}, event);
        this.fileNameToUpdate = event.imageUrl.toString();
        this.imageUrl = `http://localhost:5000/resources/images/${this.event.imageUrl}?_ts=${this.currentDate}`;
        this.event.imageUrl = '';
        this.registerForm.patchValue(this.event);

        this.event.lots.forEach(lot => {
          this.lots.push(this.createLot(lot));
        });
        this.event.socialNetworks.forEach(socialNetwork => {
          this.socialNetworks.push(this.createSocialNetwork(socialNetwork));
        });
      }
    );
  }

  validation(){
    this.registerForm = this.fb.group({
      id: [],
      theme: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      place: ['', Validators.required],
      dateEvent: ['', Validators.required],
      imageUrl: [''],
      qtdPerson: ['', [Validators.required, Validators.max(200000)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lots: this.fb.array([]),
      socialNetworks: this.fb.array([])
    });
  }

  createLot(lot: any): FormGroup {
    return this.fb.group({
      id: [lot.id],
      name: [lot.name, Validators.required],
      quantities: [lot.quantities, Validators.required],
      price: [lot.price, Validators.required],
      startDate: [lot.startDate],
      endDate: [lot.endDate]
    });
  }
  createSocialNetwork(socialNetwork: any): FormGroup{
    return this.fb.group({
      id: [socialNetwork.id],
      name: [socialNetwork.name, Validators.required],
      url: [socialNetwork.url, Validators.required]
    });
  }

  addLot() {
    this.lots.push(this.createLot({ id: 0 }));
  }

  addSocialNetwork() {
    this.socialNetworks.push(this.createSocialNetwork({ id: 0 }));
  }

  removeLot(id: number) {
    this.lots.removeAt(id);
  }

  removeSocialNetwork(id: number) {
    this.socialNetworks.removeAt(id);
  }

  onFileChange(event: any, file: FileList) {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imageUrl = event.target.result;

    this.file = event.target.files;
    reader.readAsDataURL(file[0]);
  }

  saveEvent(){
    this.event = Object.assign({ id: this.event.id }, this.registerForm.value);
    this.event.imageUrl = this.fileNameToUpdate;
    this.uploadImage();

    this.eventService.putEvent(this.event).subscribe(
          () => {
            this.toastr.success('Successfully edited');
          }, error => {
            this.toastr.success(`Error edited: ${error}`);
          }
        );
  }

  uploadImage(){
    if (this.registerForm.get('imageUrl').value !== ''){
      this.eventService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.currentDate = new Date().getMilliseconds().toString();
            this.imageUrl = `http://localhost:5000/resources/images/${this.event.imageUrl}?_ts=${this.currentDate}`;
          }
        );
    }

  }

}
