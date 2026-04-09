namespace RmeksBakeryAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public required string CustomerName { get; set; }
        public required string Phone { get; set; }
        public required string Location { get; set; }
        public required string Message { get; set; }
    }
}