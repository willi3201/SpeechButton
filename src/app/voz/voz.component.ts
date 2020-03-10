import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortcutInput, ShortcutEventOutput } from 'ng-keyboard-shortcuts';
import { SpeechService } from '../Services/speech.service';

@Component({
  selector: 'app-voz',
  templateUrl: './voz.component.html',
  styleUrls: ['./voz.component.scss']

  })
export class VozComponent implements OnInit, AfterViewInit {
  showSearchButton2: boolean;
  temp: any="";
  msg: any="";
  a:any='si';
  estado:boolean=false;
  constructor(private speechRecognitionService: SpeechService){}
  ngOnInit(): void {
    this.showSearchButton2=true;
    /*this.speechRecognitionService.show2().subscribe(
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
                this.activateSpeechSearchMovie2('si');
            }
        },
        //completion
        () => {
            this.showSearchButton2 = true;
            console.log("--complete--");
            this.msg+=this.temp;
            if(this.a!='no'){
              this.activateSpeechSearchMovie2('si' );
            }
        });*/
  }
  title = "Angular Router Demo";
  shortcuts: ShortcutInput[] = [];
  shortcuts2: ShortcutInput[] = [];
  ngAfterViewInit() {
    this.shortcuts.push(
      {
        key: ["?"],
        label: "Help",
        description: "Question mark",
        command: e => console.log("question mark clicked", { e }),
        preventDefault: true
      },
      {
        key: ["up up down down left right left right b a enter"],
        label: "Sequences",
        description: "Konami code!",
        command: (output: ShortcutEventOutput) =>
          console.log("Konami code!!!", output)
      },
      {
        key: ["cmd + b"],
        label: "Help",
        description: "Cmd + b",
        command: e => console.log(e),
        preventDefault: true
      }
    );
    this.shortcuts2.push(
      {
        key:["cmd + shift"],
        label: "Voz",
        description: "Voz",
        command: e => this.Estado(),
        preventDefault:true
      }
    );
  }
  Estado(){
    if(!this.estado){
          this.activateSpeechSearchMovie2('si')
        }else{
          this.Stop();
        }
  }
  Stop(){
    this.a='no'
    this.speechRecognitionService.DestroySpeechObject();
    this.estado=false;
  }
  activateSpeechSearchMovie2(e): void {
    this.a=e;
    this.estado=true;
    //this.showSearchButton2 = false;
    //this.speechRecognitionService.record()
    this.speechRecognitionService.show()
        .subscribe(
        //listener
        (value) => {
            this.temp =value+' ';
            
            console.log(value);
        },
        //errror
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                this.temp='';
                this.activateSpeechSearchMovie2(e);
            }
        },
        //completion
        () => {
            this.showSearchButton2 = true;
            console.log("--complete--");
            //this.msg+=' '+this.temp;
            this.msg+=this.temp;
            this.temp='';
            if(this.a!='no'){
              this.activateSpeechSearchMovie2(e);
            }
        });
        
}
}