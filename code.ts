const createRectangle = (x: number, y: number, color: { r: number, g: number, b: number }) => {
  const rect = figma.createRectangle();
  rect.x = x;
  rect.y = y;
  rect.fills = [{ type: 'SOLID', color }];
  return rect;
};

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

const handleFigjam = () => {
  const hexColors = ['#141010', '#cf5f4e', '#e5a16d', '#fae2ac', '#822229', '#18131c', '#a28284'];
  const rgbColors = hexColors.map(hexToRgb);
  let currentColor = 0;

  const box = createRectangle(figma.viewport.center.x - 50, figma.viewport.center.y - 50, rgbColors[currentColor]);
  box.resize(100, 100);

  const moveBox = (direction: string) => {
    const step = 100;
    const actions: { [key: string]: () => void } = {
      'W': () => box.y -= step,
      'A': () => box.x -= step,
      'S': () => box.y += step,
      'D': () => box.x += step,
      'U': () => createRectangle(box.x, box.y - step, rgbColors[currentColor]),
      'H': () => createRectangle(box.x - step, box.y, rgbColors[currentColor]),
      'J': () => createRectangle(box.x, box.y + step, rgbColors[currentColor]),
      'K': () => createRectangle(box.x + step, box.y, rgbColors[currentColor]),
      'N': () => createRectangle(box.x, box.y, rgbColors[currentColor]),
    };

    if (actions[direction]) {
      actions[direction]();
    } else if (/^[1-7]$/.test(direction)) {
      currentColor = parseInt(direction) - 1;
      box.fills = [{ type: 'SOLID', color: rgbColors[currentColor] }];
    }
  };

  figma.ui.onmessage = (msg) => {
    if (msg.type === 'keypress') {
      moveBox(msg.key);
    }
  };
};

if (figma.editorType === 'figma') {
  handleFigma();
} else if (figma.editorType === 'figjam') {
  handleFigjam();
}

figma.showUI(__html__);