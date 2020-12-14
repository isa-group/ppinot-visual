import PPINOTContextPadProvider from './PPINOTContextPadProvider';
import PPINOTElementFactory from './PPINOTElementFactory';
import PPINOTOrderingProvider from './PPINOTOrderingProvider';
import PPINOTPalette from './PPINOTPalette';
import PPINOTRenderer from './PPINOTRenderer';
import PPINOTRules from './PPINOTRules';
import PPINOTUpdater from './PPINOTUpdater';
import PPINOTLabelEditingProvider from "./PPINOTLabelEdingProvider";
import PPINOTModeling from "./PPINOTModeling";
import PPINOTConnect from "./PPINOTConnect";
import PPINOTReplaceConnectionBehavior from "./behaviour/ReplaceConnectionBehaviour";
import PPINOTReplaceMenuProvider from "./PPINOTReplaceMenuProvider";


export default {
  __init__: [
    'contextPadProvider',
    'PPINOTOrderingProvider',
    'PPINOTRenderer',
    'PPINOTRules',
    'PPINOTUpdater',
    'paletteProvider',
    'PPINOTLabelEditingProvider',
    'modeling',
    'connect',
    'replaceConnectionBehavior',
    'replaceMenuProvider',
   
  
  ],
  contextPadProvider: [ 'type', PPINOTContextPadProvider ],
  PPINOTOrderingProvider: [ 'type', PPINOTOrderingProvider ],
  PPINOTRenderer: [ 'type', PPINOTRenderer ],
  PPINOTRules: [ 'type', PPINOTRules ],
  PPINOTUpdater: [ 'type', PPINOTUpdater ],
  elementFactory: [ 'type', PPINOTElementFactory ],
  paletteProvider: [ 'type', PPINOTPalette ],
  PPINOTLabelEditingProvider: [ 'type', PPINOTLabelEditingProvider ],
  modeling: [ 'type', PPINOTModeling ],
  connect: [ 'type', PPINOTConnect],
  replaceConnectionBehavior: [ 'type', PPINOTReplaceConnectionBehavior],
  replaceMenuProvider: ['type', PPINOTReplaceMenuProvider]
  

};
