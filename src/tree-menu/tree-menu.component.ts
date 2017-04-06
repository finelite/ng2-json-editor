/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2016 CERN.
 *
 * ng2-json-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * ng2-json-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ng2-json-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/

import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { Map, Set } from 'immutable';

import { AbstractTrackerComponent } from '../abstract-tracker';

import { DomUtilService, WindowHrefService, PathUtilService } from '../shared/services';

@Component({
  selector: 'tree-menu',
  styleUrls: [
    './tree-menu.component.scss'
  ],
  templateUrl: './tree-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMenuComponent extends AbstractTrackerComponent implements OnChanges {

  @Input() record: Map<string, any>;
  @Input() schema: Object;

  keys: Set<string>;

  private prefixOrPath = '';

  constructor(private windowHrefService: WindowHrefService,
    private domUtilService: DomUtilService,
    private pathUtilService: PathUtilService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    let recordChange = changes['record'];
    if (recordChange) {
      let currentRecord: Map<string, any> = recordChange.currentValue;
      this.keys = currentRecord.keySeq().toSet();
    }
  }

  filter(key: string): boolean {
    return key.startsWith(this.prefixOrPath);
  }

  onKeypress(key: string) {
    if (key === 'Enter') {
      this.windowHrefService.appendHash(this.prefixOrPath);
      this.domUtilService.focusAndSelectFirstEditableChildById(this.prefixOrPath);
      this.domUtilService.flashElementById(this.prefixOrPath);
    }
  }

  getChildPath(key: string) {
    return `${this.pathUtilService.separator}${key}`;
  }
}
