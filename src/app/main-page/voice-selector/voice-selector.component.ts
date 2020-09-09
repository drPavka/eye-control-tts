import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService, Voice} from '../../player.service';
import {Observable, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-voice-selector',
    templateUrl: './voice-selector.component.html',
    styleUrls: ['./voice-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoiceSelectorComponent implements OnInit, OnDestroy {
    public selectedVoice: FormControl = new FormControl();
    private _subscription: Subscription = new Subscription();
    public voiceList$: Observable<Voice[]> = this._player.voices$.pipe(
        tap((voices: Voice[]) => {
            this.selectedVoice.setValue(voices[0])
        })
    );


    constructor(private _player: PlayerService) {
    }

    ngOnInit(): void {
        this._subscription.add(this.selectedVoice.valueChanges.pipe().subscribe(this._player.voice$$));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

}
