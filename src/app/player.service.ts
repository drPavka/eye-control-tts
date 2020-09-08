import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {filter, map, pluck, shareReplay, switchMap, tap, withLatestFrom} from 'rxjs/operators';

export interface Voice {
    languageCodes: string[],
    name: string,
    ssmlGender: string,
    naturalSampleRateHertz: number
}

interface VoiceOut {
    languageCode: 'string',
    name: string,
    ssmlGender: string,

}

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private _audio: HTMLAudioElement = new Audio();
    public text$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _text$: Observable<string> = this.text$$.asObservable().pipe(
        filter(_ => !!_),
    );

    public voice$$: BehaviorSubject<Voice | null> = new BehaviorSubject<Voice | null>(null);
    private _voice$: Observable<VoiceOut> = this.voice$$.asObservable().pipe(
        filter(_ => !!_),
        map((voice) => {
            const {languageCodes, name, ssmlGender} = voice as Voice;
            const [languageCode] = languageCodes;

            return {languageCode, name, ssmlGender};
        }),
        tap(console.log.bind(console))
    );

    private _voices$: Observable<Voice[]> | null = null;

    constructor(private _http: HttpClient) {

    }

    get voices$(): Observable<Voice[]> {
        if (!this._voices$) {
            const _ = (new HttpParams()).append('languageCode', 'en-US');

            this._voices$ = this._http.get(environment.voicesList + '?' + _.toString()).pipe(
                pluck('voices'),
                map(_ => _ as Voice[]),
                map(voices => {
                    return voices.filter(voice => {
                        return voice.languageCodes.includes('en-US')
                    })
                }),
                shareReplay(1)
            );
        }
        return this._voices$;

    }

    play$(): Observable<any> {
        return of({
            'audioConfig': {
                'audioEncoding': 'MP3'
            }
        }).pipe(
            withLatestFrom(this._voice$, this._text$),

            tap(console.log.bind(console)),
            map(([data, voice, text]) => {
                return Object.assign({}, data, {voice, input: {text}})
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
