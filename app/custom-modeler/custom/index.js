import CustomContextPadProvider from './CustomContextPadProvider';
import CustomElementFactory from './CustomElementFactory';
import CustomOrderingProvider from './CustomOrderingProvider';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import CustomRules from './CustomRules';
import CustomUpdater from './CustomUpdater';
import CustomLabelEditingProvider from "./CustomLabelEdingProvider";
import CustomModeling from "./CustomModeling";
import CustomConnect from "./CustomConnect";
import CustomReplaceConnectionBehavior from "./behaviour/ReplaceConnectionBehaviour";

export default {
  __init__: [
    'contextPadProvider',
    'customOrderingProvider',
    'customRenderer',
    'customRules',
    'customUpdater',
    'paletteProvider',
    'customLabelEditingProvider',
    'modeling',
    'connect',
    'replaceConnectionBehavior'
  ],
  contextPadProvider: [ 'type', CustomContextPadProvider ],
  customOrderingProvider: [ 'type', CustomOrderingProvider ],
  customRenderer: [ 'type', CustomRenderer ],
  customRules: [ 'type', CustomRules ],
  customUpdater: [ 'type', CustomUpdater ],
  elementFactory: [ 'type', CustomElementFactory ],
  paletteProvider: [ 'type', CustomPalette ],
  customLabelEditingProvider: [ 'type', CustomLabelEditingProvider ],
  modeling: [ 'type', CustomModeling ],
  connect: [ 'type', CustomConnect],
  replaceConnectionBehavior: [ 'type', CustomReplaceConnectionBehavior],
};
