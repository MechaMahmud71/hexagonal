export interface RabbitMqModuleOptions {
    serviceName: string,
    queueName?: string,
    exchangeName?: string,
    routingKey?: string,
    url: string,
    exchangeType?: string,
    bindingKey?: string,
    wildCards?: boolean,
    headers?: Record<string, any>
}