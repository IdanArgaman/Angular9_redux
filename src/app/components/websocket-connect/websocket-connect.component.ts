import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnDestroy,
    ChangeDetectionStrategy,
    NgZone,
    ChangeDetectorRef,
    Inject
} from '@angular/core';

import { WebsocketService } from './websocket.services';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-websocket-connect',
    templateUrl: './websocket-connect.component.html',
    styleUrls: ['./websocket-connect.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebsocketConnectComponent implements OnInit, OnDestroy {
    private wsService: WebsocketService = null;

    expanded = false;

    connectionState = 'DISCONNECTED';
    componentShown = false;

    lastMessagesVisible = false;
    lassMessagesToKeep = 10;
    lastMessages = [];

    subscription: Subscription;

    _url: string;

    keyDownHandler: (e: any) => void;

    @Input() emitLogsToConsole = false;
    @Input() displayMessages = false;
    @Input() name = '';

    @Input('url')
    set seturl(value: string) {

        this._url = value;

        this.disconnectIfExist();

        if (value) {
            setTimeout(() => {
                this.wsService = new WebsocketService({ url: this._url }, this.zone);
                this.connect();
            }, 1000);
        }
    }

    @Output() onmessage = new EventEmitter < string > ();
    @Output() onclose = new EventEmitter < Date > ();
    @Output() onerror = new EventEmitter < Date > ();

    constructor(private zone: NgZone, private cf: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: any) {

        this.keyDownHandler = (evt) => {
            if (evt.shiftKey && evt.ctrlKey && evt.keyCode === 90 /* z */ ) {
                // "Shift+Ctrl+z"
                this.componentShown = !this.componentShown;
                this.cf.detectChanges();
                event.preventDefault();
            }
        };

        this.document.addEventListener('keydown', this.keyDownHandler);

    }

    ngOnInit() {}

    ngOnDestroy() {
        this.cf.detach();
        this.document.removeEventListener('keydown', this.keyDownHandler);
        this.disconnectIfExist();
    }

    async connect() {

        try {

            const wsSubject = await this.wsService.connect();

            this.connectionState = 'CONNECTED';
            this.pushMessage({ type: 'OK', data: 'CONNECTED' });


            this.subscription = wsSubject.subscribe(
                (response) => {
                    if (this.displayMessages) {
                        this.pushMessage({ data: response.data });
                    }

                    this.onmessage.emit(response);
                },
                // SUBJECT ERROR === WS ERROR EVENT
                (e) => {
                    this.onerror.emit(e);
                },
                // SUBJECT COMPLETE === WS CLOSE EVENT
                () => {
                    this.connectionState = 'DISCONNECTED';
                    this.pushMessage({ type: 'ERROR', data: 'DISCONNECTED' });

                    this.onclose.emit(new Date());
                    setTimeout(() => this.connect(), 0);
                });


        } catch (e) {
            this.pushMessage({ type: 'ERROR', data: 'CONNECTION FAILED' });
            setTimeout(() => this.connect(), 0);
        }
    }

    disconnectIfExist() {
        if (this.wsService) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }

            this.connectionState = 'DISCONNECTED';
            this.pushMessage({ type: 'ERROR', data: 'DISCONNECTED' });
            this.onclose.emit(new Date());

            this.wsService.disconnect();
            this.wsService = null;
        }
    }

    pushMessage(messageObject) {
        const date = new Date;
        this.lastMessages.push({ time: date, ...messageObject });

        if (this.emitLogsToConsole) {
            console.log(`%c Websocket Service ${this.name || ''}: ${date} - ${messageObject.data}`,
                `color: ${messageObject.type === 'ERROR' ? 'lightcoral'
             : messageObject.type === 'OK' ? 'lightgreen' : 'black'}`);
        }

        if (this.lastMessages.length > this.lassMessagesToKeep) {
            this.lastMessages.shift();
            this.lastMessages = [...this.lastMessages];
        }

        this.cf.detectChanges();
    }
}
