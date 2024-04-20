# Instalib README

Export SELECTED code snippets to github repo files. (In a super simple and janky way!)

Note: I (and a nice AI assistant because im too lazy to make this random thought project myself) was made for my own needs, and this will only be changed/made for my needs. This is only open source because this may be useful for others.

## Extension Settings *(All Required)*

*Github Access Token* : This is used to access github's API and append code to selected files. If you dont know how to get/create one, [visit this link.](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

*Owner* : This is your name on github

*Repo* : The repository the file you want to append is located in

*FilePath* : The path of the file you want to append code to


Download the .vsix in releases, I dont expect to update this often once this is released.


## Config

To edit the config:

Open the Command Palette (Ctrl + Shift + P) and type in Configure InstaLib

This will send you to the config for InstaLib, all fields are required in order for it to work properly.

Because this was made for me only, I figured to add no checks for invalid stuff, so if something doesnt work, then its most likely invalid information (token,repo,owner, or filePath).
