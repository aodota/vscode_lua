// 'use strict';

// abstract class LineInfo {
//     type:number;
//     line:number;
//     content:string;
//     abstract getDesc(): string;
//     abstract appendContent(c:string): void;
// }

// class CommentLine extends LineInfo {
//     constructor(line:number) {
//         super();
//         this.line = line;
//     }

//     getDesc():string {
//         return "";
//     }

//     appendContent(c:string):void {
//         this.content = this.content + c;
//     }
// }

// class LuaParse {
//     private keywords = ['and', 'break', 'do', 'else', 'elseif',
//         'end', 'false', 'for', 'function', 'goto', 'if',
//         'in', 'local', 'nil', 'not', 'or', 'repeat',
//         'return', 'then', 'true', 'until', 'while'];
    

//     private text: string;
//     private p:number;
//     private line:number;
//     private char:number;
//     public parseLua(source: string) {
//         var tokens = [];
//         this.text = source;
//         var lineInfo:LineInfo = null;
//         var endFlag:string;
//         while (true) {
//             var c = this.peek();
//             if (c == ' ' || c == '\t') {
//                 // white space
//                 continue;
//             } 
//             if (c == '-') {
//                 //  command line
//                 lineInfo = new CommentLine(this.line);
//                 continue;
//             } 
//             if (c == "")

//         }

//     }

//     peek(n: number=0) {
//         return this.text.substr(this.p+n, 1);
//     }
    
//     peekWord(n: number = 0) {
//         var c = "";
//         var word = "";
//         while (true) {
//             c = this.peek();
//             if ((c == ' ' || c == '\t' || c == '\n') && word == "") {
//                 continue
//             } else if (c == ' ' || c == '\t' || c == '\n') {
//                 return word;
//             }
//             word = word + c;
//         }
//     }

//     get() {
//         var c = this.text.substr(this.p, 1)
//         if (c == '\n') {
//             this.char = 1;
//             this.line = this.line + 1;
//         } else {
//             this.char = this.char + 1;
//         }
//         this.p = this.p + 1;
//         return c;
//     }
//     consume(chars:string) {
//         var c = this.peek(0)
//         var i = 0;
//         while(i < chars.length) {
//             if (c == chars.substr(0, 1)) {
//                 return this.get();
//             }
//             i = i + 1;
//         }
//     }


// }