import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShortcutInput, ShortcutEventOutput } from 'ng-keyboard-shortcuts';
import { SpeechService } from '../Services/speech.service';
import { DomSanitizer } from '@angular/platform-browser';
import { codeBlockButton } from 'ngx-summernote';
declare var $;

@Component({
  selector: 'app-summer',
  templateUrl: './summer.component.html',
  styleUrls: ['./summer.component.scss']
})
export class SummerComponent implements OnInit {
  showSearchButton2: boolean;
  temp: any="";
  msg: any="";
  a:any='si';
  estado:boolean=false;
  frase2:any='';
  form: FormGroup;
  config:any = {
    airMode: false,
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
      ],
    },
    height: '200px',
    width: '400px',
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['decorator',['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    buttons: {
    },
    codeviewFilter: true,
    //codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
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
  }

}
