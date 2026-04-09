using Microsoft.AspNetCore.Mvc;
using RmeksBakeryAPI.Data;
using RmeksBakeryAPI.Models;

namespace RmeksBakeryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateOrder(Order order)
        {
            order.Id = DataStore.Orders.Count + 1;
            DataStore.Orders.Add(order);
            return Ok(order);
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(DataStore.Orders);
        }
    }
}