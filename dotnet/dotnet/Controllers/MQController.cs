using dotnet.Models;
using dotnet.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MQController : ControllerBase
    {
        private readonly ILogger<MQController> _logger;
        private readonly IMessageProducer _messageProducer;

        public MQController(ILogger<MQController> logger, IMessageProducer messageProducer)
        {
            _logger = logger;
            _messageProducer = messageProducer;
        }

        [HttpGet(Name = "GetData")]
        public IActionResult Get()
        {
            _messageProducer.SendMessage<MessageData>(new MessageData { Id = 1, Message = "Hello from .NET" });

            return Ok();
        }
    }
}