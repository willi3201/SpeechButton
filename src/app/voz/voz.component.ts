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
  frase2:any='';
  form: FormGroup;
  config:any = {
    airMode: true,
    lang: 'es-MX',
    tabDisable: true,
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
      ],
      link: [
        ['link', ['linkDialogShow', 'unlink']]
      ],
      air:  [
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
          ],
        ],
        ['fontsize', ['fontname', 'fontsize', 'color']],
      ],
    },
    height: '200px',
    width: '400px',
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['decorator',['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', []]
    ],
    buttons: {
      testBtn: customButton
    },
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: false
  };
  editorDisabled = false;

  get sanitizedHtml(){
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }
  
  constructor(private speechRecognitionService: SpeechService,private sanitizer: DomSanitizer){
    this.form = new FormGroup({
      text: new FormControl()
    });
  }
  ngOnInit(): void {
    this.showSearchButton2=true;
  }
  title = "Angular Router Demo";
  shortcuts: ShortcutInput[] = [];
  shortcuts2: ShortcutInput[] = [];
  ngAfterViewInit() {
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
    this.msg=this.upper(this.msg);
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
        }
    );
  }
  upper(frase) {
        frase = this.transcod(frase);
        var ind;
        var i = frase.indexOf('. ', ind);
        while (i >= 0) {
            frase = frase.replace('. ', '.');
            i = frase.indexOf('. ', ind)
        }
        //frase=frase.replace(' ','').replace('. ','.').replace('. ','.');
        var indice = 0;
        var indicePunto = frase.indexOf('.', indice);
        if (indicePunto < 0) {
            return frase;
        } else {
            while (indicePunto >= 0) {
                if (frase.substring(indice, indice + 1) == ('"')) {
                    this.frase2 = '"'
                    this.frase2 += frase.substring(indice + 1, indice + 2).toUpperCase();
                    this.frase2 += frase.substring(indice + 2, indicePunto + 1) + ' ';
                    indice = indicePunto + 2;
                    indicePunto = frase.indexOf('.', indice);
                } else {
                    if (frase.substring(indice, indice + 1) != "\n") {
                        this.frase2 += frase.substring(indice, indice + 1).toUpperCase();
                        this.frase2 += frase.substring(indice + 1, indicePunto + 1) + ' ';
                        indice = indicePunto + 1;
                        indicePunto = frase.indexOf('.', indice);
                    } else {
                        this.frase2 += '\n';
                        indice++;
                    }
                }
            }
            this.msg=this.frase2;
            return '    '+this.frase2 + ' ';
        }
    }
   //replace
    replace(str){
      str+=' ';
        var n = str.search(' punto ');
        var wc = str.length
        while(n>0 && n<wc){
        str = str.replace('punto y aparte', '.\n').replace(' dos puntos', ':').replace(' punto ', '.').replace(' comas', ',').replace('aparte', '\n ').replace('a parte', '\n ').replace('comillas ', '"').replace(' comilla ', '"').replace('puntos suspensivos','...').replace('etcetera','etc.');
        wc=str.length;
        n=str.search(' punto ');
        console.log(n);
        console.log(wc);
      }
        console.log(n,wc)
        return str;
    }
    //metodo de traduccion de palabras a simbolos
    transcod(str) {
        console.log('//msg=' + str);
        str=this.replace(str);
        console.log(str); 
        return str;
    }
  enableEditor() {
    this.editorDisabled = false;
  }

  disableEditor() {
    this.editorDisabled = true;
  }
  onBlur() {
    console.log(this.msg);
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