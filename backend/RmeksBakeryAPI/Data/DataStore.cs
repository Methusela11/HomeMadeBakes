using RmeksBakeryAPI.Models;

namespace RmeksBakeryAPI.Data
{
    public static class DataStore
    {
        public static List<Product> Products = new List<Product>
        {
            new Product { Id = 1, Name = "Wedding Cake", Category="Wedding", Price = 5000, ImageUrl="https://via.placeholder.com/300" },
            new Product { Id = 2, Name = "Birthday Cake", Category="Birthday", Price = 3000, ImageUrl="https://via.placeholder.com/300" },
            new Product { Id = 3, Name = "Graduation Cake", Category="Graduation", Price = 3500, ImageUrl="https://via.placeholder.com/300" }
        };

        public static List<Order> Orders = new List<Order>();
    }
}