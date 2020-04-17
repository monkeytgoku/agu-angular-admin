import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  // Updating parts of the data model
  // Use thesetValue() method to set a new value for an individual control
  // Use the patchValue() method to replace any properties defined in the object that have changed in the form model.

  // userForm = new FormGroup({
  //   user_name: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   first_name: new FormControl(''),
  //   last_name: new FormControl(''),
  //   email: new FormControl(''),
  //   avatar: new FormControl(''),
  //   birthday: new FormControl(''),
  //   gender: new FormControl(''),
  //   marital_status: new FormControl(''),
  //   address: new FormControl(''),
  //   mobile: new FormControl(''),
  //   lang: new FormControl(''),
  // });

  userForm = this.fb.group({
    user_name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    first_name: [''],
    last_name: [''],
    email: ['', [Validators.required, Validators.email]],
    avatar: [''],
    birthday: [''],
    gender: [''],
    marital_status: [''],
    address: [''],
    mobile: [''],
    lang: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<UserNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get userName() { return this.userForm.get('user_name'); }

}
