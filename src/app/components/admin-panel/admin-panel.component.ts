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
  private value: any = {};
  categoryObj: any;
  blogs: any;
  loading: true;

  categories: any;
  // categories = [
  //   { text: '' },
  //   { text: 'sample1' },
  //   { text: 'sample2' },
  //   { text: 'sample3' },
  // ]

  constructor(private formBuilder: FormBuilder, private data: DataService,
    private rest: RestApiService) { }

  async ngOnInit() {
    this.createBlogForm = this.formBuilder.group({
      title: ['', Validators.required],
      details: ['', Validators.required]
    });

    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl.getCategoriesOnPageLoad
      );
      data['success'] ? (this.categories = data['categories']) : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  get f() { return this.createBlogForm.controls; }

  escape: HTMLTextAreaElement = document.createElement('textarea');

  escapeHTML(html) {
    this.escape.textContent = html;
    return this.escape.innerHTML;
  }

  async onSubmit(e) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createBlogForm.invalid) {
      return;
    }

    const url = {
      url : this.escapeHTML(this.createBlogForm.value['title'].toLowerCase().split(' ').join('-'))
    } 
    
    const formData = {...this.categoryObj, ...this.createBlogForm.value, ...url};

    console.log('form data ', formData);

    try {
      const data = await this.rest.post(environment.apiHost + apiUrl.new_topic, formData);

      data['success'] ? (this.blogs = data) : this.data.error('Could not on-load data');
    } catch (error) {
      this.data.error(error['message']);
    }

    alert('SUCCESS!!');
  }

  onSelectChange(e) {
    console.log('onchange ', e);
    this.categoryObj = {
      category_id: e._id,
      category_name: e.name
    };
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
