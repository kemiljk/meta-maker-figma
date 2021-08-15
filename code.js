var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 400, height: 400 });
const nodes = [];
const { selection } = figma.currentPage;
figma.ui.onmessage = (msg) => {
    if (msg.type === "new-title") {
        if (figma.currentPage.selection.length === 0) {
            const settings = [{ format: "PNG", suffix: "@2x" }];
            const CREATE_META = () => __awaiter(this, void 0, void 0, function* () {
                yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
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
                function main(frames) {
                    frames.forEach((node) => {
                        node.exportSettings = settings;
                    });
                }
                main(nodes);
            });
            CREATE_META();
        }
        if (figma.currentPage.selection.length === 1) {
            const UPDATE_META = () => __awaiter(this, void 0, void 0, function* () {
                yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
                const selectedFrame = figma.currentPage.selection[0];
                const selectedFrameText = selectedFrame.children[0];
                selectedFrame.fills = [
                    {
                        type: "SOLID",
                        color: { r: Math.random(), g: Math.random(), b: Math.random() },
                    },
                ];
                selectedFrame.name = msg.titleText;
                selectedFrameText.characters = msg.titleText;
                selectedFrameText.name = msg.titleText;
            });
            UPDATE_META();
        }
    }
    if (msg.checkboxOn === true) {
        figma.closePlugin();
    }
};
