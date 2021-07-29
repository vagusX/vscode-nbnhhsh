// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'typescript' }, {
    provideHover(doc, pos, token): vscode.ProviderResult<vscode.Hover> {
      return new vscode.Hover('Hello World');
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
