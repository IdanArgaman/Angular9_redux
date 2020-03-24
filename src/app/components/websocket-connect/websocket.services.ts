import { Subject, Observable,  Observer } from 'rxjs';
import { NgZone } from '@angular/core';

export interface IWebSocketServiceOptions {
    url: string;
}

export class WebsocketService {

    private wsOptions = {
        url: 'ws://' + window.location.hostname + ':3000'
    };

    constructor(options: IWebSocketServiceOptions, private zone: NgZone) {
        this.wsOptions = { ...this.wsOptions, ...options };
    }
    private ws;

    public connect(): Promise < Subject < any >> {
        this.ws = new WebSocket(this.wsOptions.url);

        //#region FOR SUBJECT CREATION
        const observable = Observable.create(
            (obs: Observer < MessageEvent > ) => {

                this.ws.onmessage = obs.next.bind(obs);
                this.ws.onerror = obs.error.bind(obs);
                this.ws.onclose = obs.complete.bind(obs);

                return this.ws.close.bind(this.ws);

            });

        const observer = {
            next: (data: Object) => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(data);
                }
            }
        };
        //#endregion FOR SUBJECT CREATION

        return new Promise((resolve, reject) => {
            this.ws.addEventListener('open', () => {
                const subject = Subject.create(observer, observable);
                resolve(subject);
            });

            this.ws.addEventListener('error', (e) => {
                reject(e);
            });
        });
    }

    public disconnect() {
        this.ws.close();
    }
}
