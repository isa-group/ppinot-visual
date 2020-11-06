export const label = [
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:Clock',
    'custom:TimeSlot',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',

    'custom:AggregatedConnection'
    
]

export const externalLabel = [
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:Clock',
    'custom:Avion',
    // 'custom:AggregatedMeasure',
    // 'custom:CountAggregatedMeasure',
    // 'custom:CountMeasure',
    // 'custom:DataAggregatedMeasure',
    // 'custom:DataMeasure',
    // 'custom:DataPropertyConditionAggregatedMeasure'
]

export const connections = [
    'custom:ResourceArc',
    'custom:ConsequenceFlow',
    'custom:TimeDistanceArcStart',
    'custom:TimeDistanceArcEnd',

    'custom:MyConnection',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ConnectionTo',
    'custom:ConnectionFrom'

    
]

export const directEdit = [
    // 'custom:Resource',
    // 'custom:Role',
    // 'custom:Group',
    'custom:Clock',
    'custom:TimeSlot',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',
]

export const myConnectionElements = [
    'custom:Avion'
]

export const aggreagatedElements = [
    'custom:AggregatedMeasure'
]

export const timeMeasuresElements = [
    //'custom:TimeMeasure'  no esta implementada
]

export const resourceArcElements = [
    'custom:Clock',
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:TimeSlot',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',
]

export const custom = [
    'custom:Clock',
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:TimeSlot',
    'custom:ResourceArc',
    'custom:ConsequenceFlow',
    'custom:TimeDistanceArcStart',
    'custom:TimeDistanceArcEnd',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',

    'custom:MyConnection',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ConnectionTo',
    'custom:ConnectionFrom'

    
]

export function isCustomShape(type) {
    if (typeof type === 'object')
        type = type.type

    return type.includes('custom:') && !connections.includes(type)
}

export function isCustomConnection(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return type.includes('custom:') && connections.includes(type)
}

export function isCustomResourceArcElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return resourceArcElements.includes(type)
}

export function isCustomMyConnectionElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return myConnectionElements.includes(type)
}

export function isCustomAggregatedElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return aggreagatedElements.includes(type)
}

export function isCustomTimeMeasureElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return aggreagatedElements.includes(type)
}
