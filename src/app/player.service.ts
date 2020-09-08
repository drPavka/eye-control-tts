import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {filter, map, pluck, switchMap, tap, withLatestFrom} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private _audio: HTMLAudioElement = new Audio();
    public text$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private _text$: Observable<string> = this.text$$.asObservable().pipe(
        filter(_ => !!_),
    );

    constructor(private _http: HttpClient) {

    }

    play$(): Observable<any> {
        return of({
            'voice': {
                'languageCode': 'en-gb',
                'name': 'en-GB-Standard-A',
                'ssmlGender': 'FEMALE'
            },
            'audioConfig': {
                'audioEncoding': 'MP3'
            }
        }).pipe(
            withLatestFrom(this._text$),
            map(([data, text]) => {
                return Object.assign({}, data, {input: {text}})
            }),
            switchMap((body) => {
                return this._http.post(environment.synthesize, body);
            }),
            pluck('audioContent'),
            map(audioB64 => {
                return 'data:audio/mpeg;base64, ' + audioB64
            }),
            tap(src => {
                this._audio.src = src;
                this._audio.load();
            }),
            switchMap(() => {
                return from(this._audio.play());
            })
        );
    }
}
