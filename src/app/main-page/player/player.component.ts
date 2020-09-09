import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {switchMap, tap, withLatestFrom} from 'rxjs/operators';
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

    public click$$: Subject<void> = new Subject();
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
            this.click$$.asObservable().pipe(
                withLatestFrom(this._player.state$$),
                switchMap(([, state]) => {
                    let result$: Observable<any> = of();

                    switch (state) {
                        case PlayerState.playing:
                            this._player.pause();
                            break;
                        //@todo paused is not really paused - there are no resume method  - to implement resume - current position should be stored when pausing and seeked when resuming
                        case PlayerState.paused:
                        case PlayerState.stopped:
                            result$ = this._player.play$()
                            break;
                    }
                    return result$;
                })
                //tap(console.log.bind(console))
            ).subscribe());


    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

}
