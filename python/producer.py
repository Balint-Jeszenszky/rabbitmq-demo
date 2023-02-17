import pika
import time

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)

for i in range(15):
  message = f'Task {i} from Python'
  channel.basic_publish(
      exchange='',
      routing_key='task_queue',
      body=message,
      properties=pika.BasicProperties(
          delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
      ))
  print(" [x] Sent %r" % message)
  time.sleep(2)

connection.close()
