import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PlayerService} from '../../player.service';


@Component({
    selector: 'app-speaking-rate',
    templateUrl: './speaking-rate.component.html',
    styleUrls: ['./speaking-rate.component.scss']
})
export class SpeakingRateComponent implements OnInit, OnDestroy {
    public speakingRate: FormControl = new FormControl(1);
    public speakingRates: number[] = [
        0.25,
        0.5,
        1,
        1.5,
        2.5
    ];
    private _subscription: Subscription = new Subscription();

    constructor(private _player: PlayerService) {
    }

    ngOnInit(): void {
        this._subscription.add(
            this.speakingRate.valueChanges.pipe().subscribe(this._player.speakingRate$$)
        );
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

}
