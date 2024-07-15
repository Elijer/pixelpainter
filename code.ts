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

  // Create a rectangle (box) on the canvas
  const box = figma.createRectangle();
  box.resize(100, 100);
  box.x = figma.viewport.center.x - 50;
  box.y = figma.viewport.center.y - 50;

  // Function to move the box
  function moveBox(direction: string) {
    const step = 20; // pixels to move per key press
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
    }
  }

  // Listen for key presses
  figma.ui.onmessage = (msg) => {
    if (msg.type === 'keypress') {
      moveBox(msg.key);
    }
  };

  // Keep the plugin running
  // figma.closePlugin(); // Remove this line to keep the plugin active
}