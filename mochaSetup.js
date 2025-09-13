import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000'
});

globalThis.window = window;
globalThis.document = window.document;
globalThis.Node = window.Node;
globalThis.DocumentFragment = window.DocumentFragment;
globalThis.FormData = window.FormData;
global.MouseEvent = window.MouseEvent;
