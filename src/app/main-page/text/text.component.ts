import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PlayerService} from '../../player.service';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, skip, tap} from 'rxjs/operators';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit,
    OnDestroy {
    private _subscription: Subscription = new Subscription();
    public text: FormControl = new FormControl('', Validators.required);

    constructor(private _player: PlayerService) {
    }

    ngOnInit(): void {
        this._subscription.add(
            this.text.valueChanges.pipe(
                debounceTime(500),
                distinctUntilChanged(),
                /*skip(1),*/
                filter(_ => !!_),
                //tap(console.log.bind(console))
            ).subscribe(this._player.text$$)
        );
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

}
