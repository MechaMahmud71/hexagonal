
import * as amqp from 'amqplib';
import {
    ALARMS_EXCHANGE,
    ALARMS_TOPIC_EXCHANGE,
    ALARMS_FANOUT_EXCHANGE,
    ALARMS_QUEUE,
    ALARMS_QUEUE_1,
    ALARMS_QUEUE_2,
    ALARMS_QUEUE_FANOUT_1,
    ALARMS_QUEUE_FANOUT_2,
} from '../src/common/interfaces/rabbitmq.constants';

const queues = [ALARMS_QUEUE, ALARMS_QUEUE_1, ALARMS_QUEUE_2, ALARMS_QUEUE_FANOUT_1, ALARMS_QUEUE_FANOUT_2];
const exchanges = [ALARMS_EXCHANGE, ALARMS_TOPIC_EXCHANGE, ALARMS_FANOUT_EXCHANGE];

async function clearRabbitMQ() {
    console.log('🧹 Clearing RabbitMQ resources...');
    let connection;
    try {
        connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        console.log('🗑️  Deleting Queues...');
        for (const queue of queues) {
            try {
                await channel.deleteQueue(queue);
                console.log(`   - Deleted queue: ${queue}`);
            } catch (err) {
                console.warn(`   ! Failed to delete queue ${queue}: ${err.message}`);
            }
        }

        console.log('🗑️  Deleting Exchanges...');
        for (const exchange of exchanges) {
            try {
                await channel.deleteExchange(exchange);
                console.log(`   - Deleted exchange: ${exchange}`);
            } catch (err) {
                console.warn(`   ! Failed to delete exchange ${exchange}: ${err.message}`);
            }
        }

        console.log('✅ RabbitMQ resources cleared successfully.');
        await channel.close();
    } catch (error) {
        console.error('❌ Error clearing RabbitMQ resources:', error);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

clearRabbitMQ();
