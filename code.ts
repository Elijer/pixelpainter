// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many rectangles on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage =  (msg: {type: string, count: number}) => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-shapes') {
      const nodes: SceneNode[] = [];
      for (let i = 0; i < msg.count; i++) {
        const rect = figma.createRectangle();
        rect.x = i * 150;
        rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
        figma.currentPage.appendChild(rect);
        nodes.push(rect);
      }
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
  };
}

// Runs this code if the plugin is run in FigJam
if (figma.editorType === 'figjam') {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many shapes and connectors on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  const hexColors = [
    '#141010',
    '#cf5f4e',
    '#e5a16d',
    '#fae2ac',
    '#822229',
    '#18131c',
    '#a28284'
  ];

  const rgbColors = hexColors.map(hex => {
    // Extract the three components of the hex color code
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r: r / 255, g: g / 255, b: b / 255 };
  });

  // Create a rectangle (box) on the canvas
  const box = figma.createRectangle();
  box.resize(100, 100);
  box.x = figma.viewport.center.x - 50;
  box.y = figma.viewport.center.y - 50;
  

  let currentColor = 1

  function createBox(x: number, y: number){
    const newBox = figma.createRectangle();
    newBox.resize(100, 100)
    newBox.x = x
    newBox.y = y
    newBox.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
  }

  // Function to move the box
  function moveBox(direction: string) {
    const step = 100; // pixels to move per key press
    switch (direction) {
      case 'W':
        box.y -= step;
        break;
      case 'A':
        box.x -= step;
        break;
      case 'S':
        box.y += step;
        break;
      case 'D':
        box.x += step;
        break;
      case 'U':
        createBox(box.x, box.y - step)
        break
      case 'H':
          createBox(box.x - step, box.y)
          break
      case 'J':
        createBox(box.x, box.y + step)
        break
      case 'K':
        createBox(box.x + step, box.y)
        break
      case 'N':
          createBox(box.x, box.y)
          break
      case '1':
        currentColor = 1
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break
      case '2':
        currentColor = 2;
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break;
      case '3':
        currentColor = 3;
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break;
      case '4':
        currentColor = 4;
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break;
      case '5':
        currentColor = 5;
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break;
      case '6':
        currentColor = 6;
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break;
      case '7':
        currentColor = 7;
        box.fills = [{ type: 'SOLID', color:  rgbColors[currentColor-1]}];
        break;
    }
  }

  // Listen for key presses
  figma.ui.onmessage = (msg) => {
    console.log(msg)
    if (msg.type === 'keypress') {
      console.log(msg.key)
      moveBox(msg.key);
    }
  };

  // Keep the plugin running
  // figma.closePlugin(); // Remove this line to keep the plugin active
}