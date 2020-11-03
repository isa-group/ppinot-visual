import {
  assign
} from 'min-dash';


/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(
    palette, create, elementFactory,
    spaceTool, lassoTool, handTool,
    globalConnect, translate) {

  this._palette = palette;
  this._create = create;
  this._elementFactory = elementFactory;
  this._spaceTool = spaceTool;
  this._lassoTool = lassoTool;
  this._handTool = handTool;
  this._globalConnect = globalConnect;
  this._translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate'
];


PaletteProvider.prototype.getPaletteEntries = function(element) {

  var actions = {},
      create = this._create,
      elementFactory = this._elementFactory,
      spaceTool = this._spaceTool,
      lassoTool = this._lassoTool,
      handTool = this._handTool,
      globalConnect = this._globalConnect,
      translate = this._translate;

  function createAction(type, group, className, title, options) {

    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));
      shape.color = "#000"
      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      title: title || 'Create ' + shortType,
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  function createSubprocess(event) {
    var subProcess = elementFactory.createShape({
      type: 'bpmn:SubProcess',
      x: 0,
      y: 0,
      isExpanded: true
    });

    var startEvent = elementFactory.createShape({
      type: 'bpmn:StartEvent',
      x: 40,
      y: 82,
      parent: subProcess
    });

    create.start(event, [ subProcess, startEvent ], {
      hints: {
        autoSelect: [ startEvent ]
      }
    });
  }

  function createParticipant(event, collapsed) {
    create.start(event, elementFactory.createParticipantShape(collapsed));
  }

  assign(actions, {
    'hand-tool': {
      group: 'tools',
      className: 'bpmn-icon-hand-tool',
      title: translate('Activate the hand tool'),
      action: {
        click: function(event) {
          handTool.activateHand(event);
        }
      }
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: translate('Activate the lasso tool'),
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'space-tool': {
      group: 'tools',
      className: 'bpmn-icon-space-tool',
      title: translate('Activate the create/remove space tool'),
      action: {
        click: function(event) {
          spaceTool.activateSelection(event);
        }
      }
    },
    'global-connect-tool': {
      group: 'tools',
      className: 'bpmn-icon-connection-multi',
      title: translate('Activate the global connect tool'),
      action: {
        click: function(event) {
          globalConnect.toggle(event);
        }
      }
    },
    'tool-separator': {
      group: 'tools',
      separator: true
    },
    'create.start-event': createAction(
        'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none',
        translate('Create StartEvent')
    ),
    'create.intermediate-event': createAction(
        'bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none',
        translate('Create Intermediate/Boundary Event')
    ),
    'create.end-event': createAction(
        'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none',
        translate('Create EndEvent')
    ),
    'create.exclusive-gateway': createAction(
        'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-none',
        translate('Create Gateway')
    ),
    'create.task': createAction(
        'bpmn:Task', 'activity', 'bpmn-icon-task',
        translate('Create Task')
    ),
    'create.data-object': createAction(
        'bpmn:DataObjectReference', 'data-object', 'bpmn-icon-data-object',
        translate('Create DataObjectReference')
    ),
    'create.data-store': createAction(
        'bpmn:DataStoreReference', 'data-store', 'bpmn-icon-data-store',
        translate('Create DataStoreReference')
    ),
    'create.subprocess-expanded': {
      group: 'activity',
      className: 'bpmn-icon-subprocess-expanded',
      title: translate('Create expanded SubProcess'),
      action: {
        dragstart: createSubprocess,
        click: createSubprocess
      }
    },
    'create.participant-expanded': {
      group: 'collaboration',
      className: 'bpmn-icon-participant',
      title: translate('Create Pool/Participant'),
      action: {
        dragstart: createParticipant,
        click: createParticipant
      }
    },
    'create.group': createAction(
        'bpmn:Group', 'artifact', 'bpmn-icon-group',
        translate('Create Group')
    ),
    'custom-separator': {
      group: 'custom',
      separator: true
    },
    // 'custom-clock': createAction(
    //     'custom:Clock', 'custom', 'icon-custom-clock'
    // ),
    'custom-time-slot': createAction(
        'custom:TimeSlot', 'custom', 'icon-custom-time-slot'
    ),
    'custom-resource': createAction(
        'custom:Resource', 'custom', 'icon-custom-resource'
    ),
    'custom-resource-absence': createAction(
        'custom:ResourceAbsence', 'custom', 'icon-custom-resource-absence'
    ),
    // 'custom-role': createAction(
    //     'custom:Role', 'custom', 'icon-custom-role'
    // ),
    // 'custom-role-absence': createAction(
    //     'custom:RoleAbsence', 'custom', 'icon-custom-role-absence'
    // ),
    // 'custom-group': createAction(
    //     'custom:Group', 'custom', 'icon-custom-group'
    // ),
    // 'custom-group-absence': createAction(
    //     'custom:GroupAbsence', 'custom', 'icon-custom-group-absence'
    // ),
    'custom-avion': createAction(
      'custom:Avion', 'custom', 'icon-custom-avion'
    ),
    'custom-aggregatedMeasure': createAction(
      'custom:AggregatedMeasure', 'custom', 'icon-custom-aggregatedMeasure'
    ),
    'custom-countAggregatedMeasure': createAction(
      'custom:CountAggregatedMeasure', 'custom', 'icon-custom-countAggregatedMeasure'
    ),
    'custom-countMeasure': createAction(
      'custom:CountMeasure', 'custom', 'icon-custom-countMeasure'
    ),
    'custom-dataAggregatedMeasure': createAction(
      'custom:DataAggregatedMeasure', 'custom', 'icon-custom-dataAggregatedMeasure'
    ),
    'custom-dataMeasure': createAction(
      'custom:DataMeasure', 'custom', 'icon-custom-dataMeasure'
    ),
    'custom-dataPropertyConditionAggregatedMeasure': createAction(
      'custom:DataPropertyConditionAggregatedMeasure', 'custom', 'icon-custom-dataPropertyConditionAggregatedMeasure'
    ),
    'custom-dataPropertyConditionMeasure': createAction(
      'custom:DataPropertyConditionMeasure', 'custom', 'icon-custom-dataPropertyConditionMeasure'
    ),
    'custom-derivedMultiInstanceMeasure': createAction(
      'custom:DerivedMultiInstanceMeasure', 'custom', 'icon-custom-derivedMultiInstanceMeasure'
    )
    
    
  });

  return actions;
};
