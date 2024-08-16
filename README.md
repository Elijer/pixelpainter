![image](https://thornberry-obsidian-general.s3.us-east-2.amazonaws.com/attachments/a3a12907dcd839ba44a15646df032ef7.png)

# About
This is a somewhat simply Figma plugin that allows Figma users to draw art one box at a time, using a limited and unified palette of oranges, reds and browns. The plugin has a UI panel when initialized that lists the intructions, but you can also view them here:

- **Movement**: W, A, S, D
- **Paint directionally:** U, H, J, K
- **Paint at current position:** N
- **Change Color:** 3, 4, 5, 6, 7, 8

![image](https://thornberry-obsidian-general.s3.us-east-2.amazonaws.com/attachments/1c78da96e96db690a4c49b244a2736af.png)

# Using this Unofficial Figma Plugin
Below are the steps to get your plugin running. You can also find instructions at:

  https://www.figma.com/plugin-docs/plugin-quickstart-guide/

This plugin template uses Typescript and NPM, two standard tools in creating JavaScript applications.

First, download Node.js which comes with NPM. This will allow you to install TypeScript and other
libraries. You can find the download link here:

  https://nodejs.org/en/download/

Next, install TypeScript using the command:

`npm install -g typescript`

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

`npm install --save-dev @figma/plugin-typings`

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "npm: watch". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.

![image](https://thornberry-obsidian-general.s3.us-east-2.amazonaws.com/attachments/9c1d1e8d1414533f7fa5b742de1f7f8c.png)
