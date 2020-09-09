import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>`,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    constructor(_title: Title) {
        _title.setTitle('Eye Control test task: Text to speech application ');
    }
}
