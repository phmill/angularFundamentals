import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ISession, restrictedWords } from '../shared';

@Component({
  selector: 'create-session',
  templateUrl:'./create-session.component.html',
  styles:[`
  em { float: right; color: #e05c65; padding-left: 10px; }
  .error input, .error select, .error textarea { background-color: #e3c3c5; }
  .error ::webkit-input-placeholder { color: #999; }
  .error ::-moz-placeholder { color: #999; }
  .error :-moz-placeholder { color: #999; }
  .error :ms-input-placeholder { color: #999; }
`]
})
export class CreateSessionComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();
  newSessionForm;
  name;
  presenter;
  duration;
  level;
  abstract;

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
      restrictedWords(['tonpere', 'tamere'])
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    })
  }

  // private restrictedWords(control:FormControl):{ [key: string]: any } {
  //   return control.value.includes('tonpere')
  //     ? { 'restrictedWords': 'tonpere'}
  //     : null;
  // }


  saveSession(formValues) {
    // let session:ISession = {...formValues};
    let session: ISession = {
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      id: undefined,
      voters: [],
    }
    console.log(session);

    this.saveNewSession.emit(session);
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
