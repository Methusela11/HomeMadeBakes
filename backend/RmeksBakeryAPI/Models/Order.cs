namespace RmeksBakeryAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string CustomerName { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public string Message { get; set; }
    }
}