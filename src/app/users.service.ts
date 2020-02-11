import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    // activateButton = new EventEmitter<boolean>();
    activateButton = new Subject<boolean>();
}