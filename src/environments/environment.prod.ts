const TEXT_TO_SPEECH_BASE = 'https://texttospeech.googleapis.com/v1/';

export const environment = {
    production: true,
    //@todo  - rewrite. Only for test purposes it is shown on client
    apiKeyObj: {
        'X-Goog-Api-Key': 'AIzaSyBUrG7YyqBHH-TcgwACamVt3mlNU2u5dR4'
    },
    voicesList: TEXT_TO_SPEECH_BASE + 'voices',
    synthesize: TEXT_TO_SPEECH_BASE + 'text:synthesize'
};
