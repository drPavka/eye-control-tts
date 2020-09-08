import {Component, OnInit} from '@angular/core';
import {PlayerService, Voice} from '../../player.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-voice-selector',
    templateUrl: './voice-selector.component.html',
    styleUrls: ['./voice-selector.component.scss']
})
export class VoiceSelectorComponent implements OnInit {
    public selectedVoice: FormControl = new FormControl();

    public voiceList$: Observable<Voice[]> = this._player.voices$.pipe(
        tap((voices: Voice[]) => {
            this.selectedVoice.setValue(voices[0])
        })
    );


    constructor(private _player: PlayerService) {
    }

    ngOnInit(): void {
        this.selectedVoice.valueChanges.pipe().subscribe(this._player.voice$$)
    }

}
