import {Pipe, PipeTransform} from '@angular/core';
import {Voice} from './player.service';

@Pipe({
    name: 'voiceName'
})
export class VoiceNamePipe implements PipeTransform {

    transform(value: Voice, ...args: unknown[]): unknown {
        //en-US-
        return value.name.substr(6);
    }

}
