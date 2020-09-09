import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {PlayerService, PlayerState} from '../../player.service';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatButton) _button: MatButton | undefined;

    public toggle$$: Subject<void> = new Subject();
    public icon: string = 'play_arrow';
    private _subscription: Subscription = new Subscription();

    constructor(
        private _player: PlayerService,
        private _changeRef: ChangeDetectorRef
    ) {
    }

    ngAfterViewInit(): void {
        this._subscription.add(
            this._player.state$.pipe(
                tap((state: PlayerState) => {
                    switch (state) {
                        case PlayerState.disabled:
                            (this._button as MatButton).disabled = true;
                            this.icon = 'play_arrow';
                            break;
                        case PlayerState.playing:
                            (this._button as MatButton).disabled = false;
                            this.icon = 'pause';
                            break;
                        case PlayerState.paused:
                            (this._button as MatButton).disabled = false;
                            this.icon = 'play_arrow';
                            break;
                        case PlayerState.stopped:
                            (this._button as MatButton).disabled = false;
                            this.icon = 'play_arrow';
                            break;
                    }
                    this._changeRef.detectChanges();
                })
            ).subscribe()
        );
    }

    ngOnInit(): void {
        this._subscription.add(
            this.toggle$$.asObservable().pipe(
                switchMap(this._player.play$.bind(this._player)),
                //tap(console.log.bind(console))
            ).subscribe());


    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

}
