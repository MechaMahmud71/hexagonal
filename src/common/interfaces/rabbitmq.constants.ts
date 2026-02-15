export const ALARMS_EXCHANGE = 'alarms_exchange';
export const ALARMS_TOPIC_EXCHANGE = 'alarms_topic_exchange';
export const ALARMS_FANOUT_EXCHANGE = 'alarms_fanout_exchange';
export const ALARMS_HEADER_EXCHANGE = 'alarms_header_exchange';

export const ALARMS_QUEUE = 'alarms_queue';
export const ALARMS_QUEUE_1 = 'alarms_queue_1';
export const ALARMS_QUEUE_2 = 'alarms_queue_2';
export const ALARMS_QUEUE_FANOUT_1 = 'alarms_queue_fanout_1';
export const ALARMS_QUEUE_FANOUT_2 = 'alarms_queue_fanout_2';
export const ALARMS_QUEUE_HEADER = 'alarms_queue_header';

export const ALARM_CREATED_ROUTING_KEY = 'alarm.created';
export const ALARM_CREATED_ROUTING_KEY_1 = 'alarm.created_1';
export const ALARM_CREATED_ROUTING_KEY_2 = 'alarm.created_2'; // Not used in current code but good to have consistency if needed

// Routing Keys for Topic Exchange
export const ALARM_TOPIC_ROUTING_KEY_PREFIX = 'alarm';

// Binding Keys
export const ALARM_CREATED_BINDING_KEY = 'alarm.created';
export const ALARM_CREATED_BINDING_KEY_1 = 'alarm.created_1';
export const ALARM_TOPIC_BINDING_KEY_PATTERN = 'alarm.*.topic';

// Event Patterns for NestJS Consumer
// export const ALARM_TOPIC_EVENT_PATTERNS = [
//     'alarm.critical.topic',
//     'alarm.high.topic',
//     'alarm.medium.topic',
//     'alarm.low.topic',
//     // Supporting uppercase as seen in logs
//     'alarm.CRITICAL.topic',
//     'alarm.HIGH.topic',
//     'alarm.MEDIUM.topic',
//     'alarm.LOW.topic',
// ];

export const ALARM_TOPIC_EVENT_PATTERNS = [
    'alarm.*.topic',
];

export const ALARM_FANOUT_BINDING_KEY = 'alarm.fanout';
