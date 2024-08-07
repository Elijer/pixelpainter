let history: RectangleNode[] = []

const createRectangle = (x: number, y: number, color: { r: number, g: number, b: number }, cursor = false) => {
  const rect = figma.createRectangle();
  rect.x = x;
  rect.y = y;
  rect.fills = [{ type: 'SOLID', color }];
  if (!cursor){
    history.push(rect)
  } else {
    rect.strokes = [{ type: 'SOLID', color: {r: .5, g: 0.15, b: .15} }];
    rect.strokeWeight = 8;
  }
  return rect;
};

const moveRectangle = (xMove: number, yMove: number, box: RectangleNode, step: number, color: any) => {
  let newBox = createRectangle(box.x + xMove*step, box.y + yMove*step, color, true)
  box.remove()
  // figma.viewport.scrollAndZoomIntoView(history);
  return newBox
}

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
};

const handleFigma = () => {
  figma.ui.onmessage = (msg: { type: string, count: number }) => {
    if (msg.type === 'create-shapes') {
      const nodes: SceneNode[] = Array.from({ length: msg.count }, (_, i) => 
        createRectangle(i * 150, 0, { r: 1, g: 0.5, b: 0 })
      );
      nodes.forEach(node => figma.currentPage.appendChild(node));
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }
    figma.closePlugin();
  };
};

let snapCoords = (num: number, interval: number = 50) => {
  return num - (num % interval)
}

const handleFigjam = () => {
  const hexColors = ['#141010', '#cf5f4e', '#e5a16d', '#fae2ac', '#822229', '#524d56'];
  const rgbColors = hexColors.map(hexToRgb);
  let currentColor = 0;

  // let box = createRectangle((figma.viewport.center.x - 50), figma.viewport.center.y - 50, rgbColors[currentColor], true);
  let box = createRectangle(snapCoords(figma.viewport.center.x, 50), snapCoords(figma.viewport.center.y, 50), rgbColors[currentColor], true);
  box.resize(100, 100);

  const moveBox = (direction: string) => {
    const step = 100;
    const actions: { [key: string]: () => void } = {
      // 'W': () => box.y -= step,
      'W': () => { box = moveRectangle(0, -1, box, step, rgbColors[currentColor])},
      'A': () => { box = moveRectangle(-1, 0, box, step, rgbColors[currentColor])},
      'S': () => { box = moveRectangle(0, +1, box, step, rgbColors[currentColor])},
      'D': () => { box = moveRectangle(+1, 0, box, step, rgbColors[currentColor])},
      'U': () => createRectangle(box.x, box.y - step, rgbColors[currentColor]),
      'H': () => createRectangle(box.x - step, box.y, rgbColors[currentColor]),
      'J': () => createRectangle(box.x, box.y + step, rgbColors[currentColor]),
      'K': () => createRectangle(box.x + step, box.y, rgbColors[currentColor]),
      'N': () => createRectangle(box.x, box.y, rgbColors[currentColor]),
      'Z': () => {
        if (history.length){
          let last = history.pop()
          if (last) last.remove()
        }
      }
    };

    if (actions[direction]) {
      actions[direction]();
    } else if (/^[3-8]$/.test(direction)) {
      currentColor = parseInt(direction) - 3;
      box = moveRectangle(0, 0, box, step, rgbColors[currentColor])
      // box.fills = [{ type: 'SOLID', color: rgbColors[currentColor] }];
    }
  };

  figma.ui.onmessage = (msg) => {
    if (msg.type === 'keypress') {
      moveBox(msg.key);
    }
  };

  figma.on('close', () => {
    if (box){
      box.remove()
    }
  });
};

if (figma.editorType === 'figma') {
  handleFigma();
} else if (figma.editorType === 'figjam') {
  handleFigjam();
}

figma.showUI(__html__);