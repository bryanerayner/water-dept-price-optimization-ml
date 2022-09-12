import { Component, OnInit, Input } from '@angular/core';
import { UserGroupModel } from 'src/app/models/user-group.model';
import {PriceSchemeModel} from '../../models/price-scheme.model';

@Component({
  selector: 'app-price-scheme-settings-editor',
  templateUrl: './price-scheme-settings-editor.component.html',
  styleUrls: ['./price-scheme-settings-editor.component.scss'],
})
export class PriceSchemeSettingsEditorComponent implements OnInit {
  @Input()
  model: PriceSchemeModel | null = null;

  @Input()
  userGroup: UserGroupModel | null = null;

  constructor() {}

  ngOnInit(): void {}
}
