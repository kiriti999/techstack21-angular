import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiUrl } from './../../api-call-list/api.call.list';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  createBlogForm: FormGroup;
  submitted = false;
  private value:any = {};

  // categories: any;
  categories = [
    { text: '' },
    { text: 'sample1' },
    { text: 'sample2' },
    { text: 'sample3' },
  ]

  constructor(private formBuilder: FormBuilder, private data: DataService,
    private rest: RestApiService) { }

  async ngOnInit() {
    this.createBlogForm = this.formBuilder.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      category: ['', Validators.required],
    });

    // try {
    //   const data = await this.rest.get(
    //     environment.apiHost + apiUrl.getCategoriesOnPageLoad
    //   );
    //   data['success'] ? (this.categories = data['categories']) : this.data.error(data['message']);
    // } catch (error) {
    //   this.data.error(error['message']);
    // }
  }

  get f() { return this.createBlogForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createBlogForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)')
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

}
