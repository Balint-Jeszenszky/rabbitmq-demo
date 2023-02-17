using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

var factory = new ConnectionFactory()
{
    HostName = "localhost",
    UserName = "guest",
    Password = "guest",
};

var connection = factory.CreateConnection();

using var channel = connection.CreateModel();

channel.QueueDeclare("test_queue", durable: true, exclusive: false);

var consumer = new EventingBasicConsumer(channel);

consumer.Received += (model, eventArgs) =>
{
    var body = eventArgs.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);

    Console.WriteLine(message);

    channel.BasicAck(eventArgs.DeliveryTag, false);
};

channel.BasicConsume("task_queue", false, consumer);

Console.ReadKey();
