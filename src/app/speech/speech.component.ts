import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { SpeechService } from '../Services/speech.service';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})

export class SpeechComponent implements OnInit, OnDestroy{
    
    showSearchButton: boolean;
    showSearchButton2: boolean;
    speechData: string='';
    temp: string='';
    msg:string='';
    constructor(private speechRecognitionService: SpeechService) {
        this.showSearchButton = true;
        this.showSearchButton2 = true;

    }
    ngOnInit() {
        console.log("hello")
    }
    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }
    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;
        this.speechRecognitionService.record()
        //this.speechRecognitionService.show()
            .subscribe(
            //listener
            (value) => {
                this.speechData = ' '+value;
                this.temp=this.speechData;
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    //this.msg+=this.temp;
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                //this.msg+=this.temp;
                this.activateSpeechSearchMovie();
            });
    }
    activateSpeechSearchMovie2(): void {
        this.showSearchButton2 = false;
        //this.speechRecognitionService.record()
        this.speechRecognitionService.show()
            .subscribe(
            //listener
            (value) => {
                this.temp =value;
                
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.msg+=this.temp;
                    this.activateSpeechSearchMovie2();
                }
            },
            //completion
            () => {
                this.showSearchButton2 = true;
                console.log("--complete--");
                this.msg+=this.temp;
                this.activateSpeechSearchMovie2();
            });
    }
}