'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {LuaSymbolProvider} from "./providers/symbolProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const LUA: vscode.DocumentFilter = {language:"lua", scheme:"file"}

export function activate(context: vscode.ExtensionContext) {
    let rootDir = context.asAbsolutePath(".");
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "lua" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);

    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(LUA, new LuaSymbolProvider(context)));
}

// this method is called when your extension is deactivated
export function deactivate() {
}