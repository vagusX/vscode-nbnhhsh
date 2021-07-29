import * as vscode from 'vscode';
import * as nbnhhshClient from './nbnhhsh-client';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'typescript' }, {
    provideHover(doc, pos, token): vscode.ProviderResult<vscode.Hover> {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.selection) {
        const word = editor.document.getText(editor.selection);
        return nbnhhshClient.guess(word)
          .then(res => {
            if (res.status === 200 && res.data) {
              if (res.data[0]) {
                const item = res.data[0];
                const hoverTip = nbnhhshClient.isExactResponseItem(item)
                  ? item.trans[0]
                  : item.inputting[0];
                return new vscode.Hover([
                  hoverTip,
                ]);
              }
            }
          });
      }
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
