figma.showUI(__html__, { width: 400, height: 400 });
const nodes: SceneNode[] = [];
const { selection } = figma.currentPage;

figma.ui.onmessage = (msg) => {
  if (msg.type === "new-title") {
    const CREATE_META = async () => {
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      const settings = [{ format: "PNG", suffix: "@2x" }];
      if (selection.length === 1 && selection[0].type === "FRAME") {
        const selectedFrame = figma.currentPage.selection[0] as FrameNode;
        const selectedFrameText = selectedFrame.children[0] as TextNode;
        selectedFrame.fills = [
          {
            type: "SOLID",
            color: { r: Math.random(), g: Math.random(), b: Math.random() },
          },
        ];
        selectedFrame.name = msg.titleText;
        selectedFrameText.characters = msg.titleText;
        selectedFrameText.name = msg.titleText;
      } else if (selection.length === 0) {
        const frame = figma.createFrame();
        const title = figma.createText();
        title.fontName = { family: "Inter", style: "Bold" };
        title.characters = msg.titleText;
        title.resize(1120, frame.height);
        title.textAutoResize = "HEIGHT";
        title.name = msg.titleText;
        title.fontSize = 104;
        title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

        frame.name = msg.titleText;
        frame.fills = [
          {
            type: "SOLID",
            color: { r: Math.random(), g: Math.random(), b: Math.random() },
          },
        ];

        frame.layoutMode = "VERTICAL";
        frame.primaryAxisAlignItems = "MAX";
        frame.counterAxisAlignItems = "MIN";
        frame.paddingTop = 40;
        frame.paddingRight = 40;
        frame.paddingBottom = 40;
        frame.paddingLeft = 40;
        frame.resize(1200, 630);

        frame.appendChild(title);
        figma.currentPage.appendChild(frame);

        nodes.push(frame);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
      }

      function main(nodes) {
        nodes.forEach((node) => {
          node.exportSettings = settings;
        });
      }
      main(nodes);
    };
    CREATE_META();
  }

  if (msg.checkboxOn === true) {
    figma.closePlugin();
  }
};
