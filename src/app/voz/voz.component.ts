import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShortcutInput, ShortcutEventOutput } from 'ng-keyboard-shortcuts';
import { SpeechService } from '../Services/speech.service';
import { DomSanitizer } from '@angular/platform-browser';
import { codeBlockButton } from 'ngx-summernote';
declare var $;

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
  form: FormGroup;
  config:any = {
    airMode: false,
    lang: 'es-ES',
    tabDisable: true,
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [
        ['link', ['linkDialogShow', 'unlink']]
      ],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear'
          ]
        ],
      ]
    },
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear'
        ]
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']]
    ],
    buttons: {
      testBtn: customButton
    },
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: true
  };
  editorDisabled = false;

  get sanitizedHtml(){
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }
  constructor(private speechRecognitionService: SpeechService,private sanitizer: DomSanitizer){
    this.form = new FormGroup({
      html: new FormControl()
    });
  }


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
enableEditor() {
    this.editorDisabled = false;
  }

  disableEditor() {
    this.editorDisabled = true;
  }

  onBlur() {
    console.log('Blur');
  }

  onDelete(file) {
    console.log('Delete file', file.url);
  }

  summernoteInit(event) {
    console.log(event)
  }
}
function customButton(context) {
  const ui = $.summernote.ui;
  const button = ui.button({
    contents: '<i class="note-icon-magic"></i> Hello',
    tooltip: 'Custom button',
    container: '.note-editor',
    className: 'note-btn',
    click: function() {
      context.invoke('editor.insertText', 'Hello from test btn!!!');
    }
  });
  return button.render();
}