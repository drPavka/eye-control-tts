import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PlayerService, PlayerState} from '../../player.service';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
                tap(() => {
                    if (this.text.invalid) {
                        this._player.state$$.next(PlayerState.disabled);
                    } else {
                        this._player.state$$.next(PlayerState.stopped);
                    }
                }),
                filter(() => this.text.valid),
                //tap(console.log.bind(console))
            ).subscribe(this._player.text$$)
        );
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

}
