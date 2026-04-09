using RmeksBakeryAPI.Models;

namespace RmeksBakeryAPI.Data
{
    public static class DataStore
    {
        public static List<Product> Products = new List<Product>
        {
            new Product 
            { 
                Id = 1, 
                Name = "Wedding Cake", 
                Category = "Wedding", 
                Description = "Elegant wedding cake", 
                Price = 5000, 
                ImageUrl = "https://via.placeholder.com/300" 
            },

            new Product 
            { 
                Id = 2, 
                Name = "Birthday Cake", 
                Category = "Birthday", 
                Description = "Delicious birthday cake", 
                Price = 3000, 
                ImageUrl = "https://via.placeholder.com/300" 
            },

            new Product 
            { 
                Id = 3, 
                Name = "Graduation Cake", 
                Category = "Graduation", 
                Description = "Special graduation cake", 
                Price = 3500, 
                ImageUrl = "https://via.placeholder.com/300" 
            },
            new Product 
            { 
                Id = 4, 
                Name = "Anniversary Cake", 
                Category = "Anniversary", 
                Description = "Special anniversary cake", 
                Price = 5500, 
                ImageUrl = "https://via.placeholder.com/300" 
            },
            new Product 
            { 
                Id = 5, 
                Name = "Custom Cake", 
                Category = "Custom", 
                Description = "Special custom cake", 
                Price = 5000, 
                ImageUrl = "https://via.placeholder.com/300" 
            }

        };

        public static List<Order> Orders = new List<Order>();
    }
}