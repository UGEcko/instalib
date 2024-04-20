// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import axios from 'axios'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "instalib" is now active!');

	// Get configuration settings
	const config = vscode.workspace.getConfiguration('instalib');

	let accessToken = config.get('accessToken')
	let owner = config.get('owner');
	let repo = config.get('repo');
	let filePath = config.get('filePath');

	vscode.workspace.onDidChangeConfiguration(event => { // If there are any changes in config
		if (event.affectsConfiguration('instalib')) { // If the changes effect this extension
			// Configuration settings have changed
			// Re-fetch the configuration values
			accessToken = config.get('accessToken');
			owner = config.get('owner');
			repo = config.get('repo');
			filePath = config.get('filePath');
			vscode.window.showInformationMessage("Found new settings: " + accessToken + "\n" + owner + "\n" + repo + "\n" + filePath)
		}
	});

	async function appendToGitHubFile(selectedText: string) {
		try {
			const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
				headers: {
					Authorization: `token ${accessToken}`,
				},
			});
	
			// Decode the content of the file from base64
			const currentContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
	
			// Append the selected text to the current content
			const updatedContent = currentContent + '\n' + selectedText;
	
			// Make a PUT request to update the contents of the file
			const putResponse = await axios.put(
				`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
				{
					message: 'Add code via instaLib',
					content: Buffer.from(updatedContent).toString('base64'),
					sha: response.data.sha, // SHA hash of the current content
				},
				{
					headers: {
						Authorization: `token ${accessToken}`,
					},
				}
			);
	
			console.log('Text appended to GitHub file successfully:', putResponse.data);
			vscode.window.showInformationMessage(`Successfully exported code to ${repo}`);
		} catch (error) {
			console.error('Error appending text to GitHub file:', error);
			vscode.window.showErrorMessage(`Error while exporting code to ${repo}: ${error}`);
		}
	}

	// Blah blah blah shit registering
	let disposable = vscode.commands.registerCommand('instalib.helloWorld', () => {
		const editor = vscode.window.activeTextEditor;

				vscode.window.showInformationMessage('Attempting to export code to ' + repo + " // " + filePath);

				if(editor) {
					let selectedText = editor.document.getText(editor.selection)
					appendToGitHubFile(selectedText);
				} else {	
					vscode.window.showErrorMessage('Error while trying to find selected code.');
				}
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('instalib.configInstaLib', () => {
			vscode.commands.executeCommand('workbench.action.openSettings', '@ext:ugecko.instaLib');
	});

	context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
export function deactivate() {}
