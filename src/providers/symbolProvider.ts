'use strict';

import * as vscode from 'vscode';

var parser = require("luaparse");
var funslist = [];
var calls = [];
var symbols = [];
var classes = [];
var hasClass:boolean = false;
export class LuaSymbolProvider implements vscode.DocumentSymbolProvider {
    private context: vscode.ExtensionContext;
    public constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }
    
    public provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
        return new Promise<vscode.SymbolInformation[]>((resolve, reject) => {
            var filename = document.fileName;
            var source = document.getText();
            var result = parser.parse(source, {comments:false, locations:true, ranges:true, scope:true});
            // console.log(JSON.stringify(result))
            
            for (var i = 0; i < result.body.length; i++) {
                var type = result.body[i].type;
                if (type == "FunctionDeclaration") {
                    // 函数声明
                    var identifierType = result.body[i].identifier.type;
                    var name = "";
                    if (identifierType == "MemberExpression") {
                        var indexer = result.body[i].identifier.indexer;
                        name = result.body[i].identifier.identifier.name; 
                        if (result.body[i].identifier.base.name != null) {
                            name = result.body[i].identifier.base.name + indexer + name;
                        }
                    } else {
                        name = result.body[i].identifier.name;
                    }
                    var loc = result.body[i].loc; 
                    var start = new vscode.Position(loc.start.line - 1, loc.start.column);
                    var end = new vscode.Position(loc.end.line - 1, loc.end.column);
                    symbols.push(new vscode.SymbolInformation(name, vscode.SymbolKind.Function, new vscode.Range(start, end)));
                 } else if (type == "LocalStatement") {
                     // 本地变量声明
                     name = result.body[i].variables[0].name
                     var loc = result.body[i].variables[0].loc; 
                     var start = new vscode.Position(loc.start.line - 1, loc.start.column);
                     var end = new vscode.Position(loc.end.line - 1, loc.end.column);
                     var variaType = null;
                     if (result.body[i].init[0].base) {
                         variaType = result.body[i].init[0].base.name;
                     }
                     if (variaType == "class") {
                          symbols.push(new vscode.SymbolInformation(name, vscode.SymbolKind.Class, new vscode.Range(start, end)));
                     } else {
                          symbols.push(new vscode.SymbolInformation(name, vscode.SymbolKind.Variable, new vscode.Range(start, end)));
                     }
                 }
            }

            // var start = document.lineAt(1).range.start;
            // var end = document.lineAt(3).range.end;
            // var symbole = new vscode.SymbolInformation("send", vscode.SymbolKind.Function, new vscode.Range(start, end));
            // console.log(JSON.stringify(result))



            return resolve(symbols);
        });
    }
}
