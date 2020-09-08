import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './layout/layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TextComponent} from './main-page/text/text.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MainPageComponent} from './main-page/main-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PlayerComponent} from './main-page/player/player.component';
import {GCloudApiInterceptor} from './gcloud-api.interceptor';
import {VoiceSelectorComponent} from './main-page/voice-selector/voice-selector.component';
import {MatSelectModule} from '@angular/material/select';
import {VoiceNamePipe} from './voice-name.pipe';
import {SpeakingRateComponent} from './main-page/speaking-rate/speaking-rate.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        TextComponent,
        MainPageComponent,
        PlayerComponent,
        VoiceSelectorComponent,
        VoiceNamePipe,
        SpeakingRateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        MatSelectModule

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: GCloudApiInterceptor
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
