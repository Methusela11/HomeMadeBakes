from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('cakes', 'Cakes'),
        ('cookies', 'Cookies'),
        ('breads', 'Breads'),
        ('chocolates', 'Chocolates'),
        ('custom', 'Custom'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.name