import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {PlayerService} from '../../player.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    public toggle$$: Subject<void> = new Subject();

    constructor(private _player: PlayerService) {
    }

    ngOnInit(): void {
        this.toggle$$.asObservable().pipe(
            switchMap(this._player.play$.bind(this._player)),
            //tap(console.log.bind(console))
        ).subscribe();
    }

}
