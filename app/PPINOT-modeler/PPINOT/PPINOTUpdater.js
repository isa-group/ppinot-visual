import inherits from 'inherits';

import {
  pick,
  assign
} from 'min-dash';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  add as collectionAdd,
  remove as collectionRemove
} from 'diagram-js/lib/util/Collections';


/**
 * A handler responsible for updating the PPINOT element's businessObject
 * once changes on the diagram happen.
 */
export default function PPINOTUpdater(eventBus, modeling, bpmnjs) {

  CommandInterceptor.call(this, eventBus);

  function updatePPINOTElement(e) {
    var context = e.context,
        shape = context.shape,
        businessObject = shape.businessObject;

    if (!isPPINOT(shape)) {
      return;
    }

    var parent = shape.parent;

    var PPINOTElements = bpmnjs._PPINOTElements;

    // make sure element is added / removed from bpmnjs.PPINOTElements
    if (!parent) {
      collectionRemove(PPINOTElements, businessObject);
    } else {
      collectionAdd(PPINOTElements, businessObject);
    }

    // save PPINOT element position
    assign(businessObject, pick(shape, [ 'x', 'y' ]));
  }

  function updatePPINOTConnection(e) {
    var context = e.context,
        connection = context.connection,
        source = connection.source,
        target = connection.target,
        businessObject = connection.businessObject;

    var parent = connection.parent;

    var PPINOTElements = bpmnjs._PPINOTElements;

    // make sure element is added / removed from bpmnjs.PPINOTElements
    if (!parent) {
      collectionRemove(PPINOTElements, businessObject);
    } else {
      collectionAdd(PPINOTElements, businessObject);
    }

    // update waypoints
    assign(businessObject, {
      waypoints: copyWaypoints(connection)
    });

    if (source && target) {
      assign(businessObject, {
        source: source.id,
        target: target.id
      });
    }

  }

  this.executed([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], ifPPINOTElement(updatePPINOTElement));

  this.reverted([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], ifPPINOTElement(updatePPINOTElement));

  this.executed([
    'connection.create',
    'connection.reconnectStart',
    'connection.reconnectEnd',
    'connection.updateWaypoints',
    'connection.delete',
    'connection.layout',
    'connection.move'
  ], ifPPINOTElement(updatePPINOTConnection));

  this.reverted([
    'connection.create',
    'connection.reconnectStart',
    'connection.reconnectEnd',
    'connection.updateWaypoints',
    'connection.delete',
    'connection.layout',
    'connection.move'
  ], ifPPINOTElement(updatePPINOTConnection));


  /**
   * When morphing a Process into a Collaboration or vice-versa,
   * make sure that the existing PPINOT elements get their parents updated.
   */
  function updatePPINOTElementsRoot(event) {
    var context = event.context,
        oldRoot = context.oldRoot,
        newRoot = context.newRoot,
        children = oldRoot.children;

    var PPINOTChildren = children.filter(isPPINOT);

    if (PPINOTChildren.length) {
      modeling.moveElements(PPINOTChildren, { x: 0, y: 0 }, newRoot);
    }
  }

  this.postExecute('canvas.updateRoot', updatePPINOTElementsRoot);
}

inherits(PPINOTUpdater, CommandInterceptor);

PPINOTUpdater.$inject = [ 'eventBus', 'modeling', 'bpmnjs' ];


/////// helpers ///////////////////////////////////

function copyWaypoints(connection) {
  return connection.waypoints.map(function(p) {
    return { x: p.x, y: p.y };
  });
}

function isPPINOT(element) {
  return element && /PPINOT:/.test(element.type);
}

function ifPPINOTElement(fn) {
  return function(event) {
    var context = event.context,
        element = context.shape || context.connection;

    if (isPPINOT(element)) {
      fn(event);
    }
  };
}