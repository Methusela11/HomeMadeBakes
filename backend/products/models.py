from django.db import models
from django.utils.text import slugify


class Product(models.Model):

    CATEGORY_CHOICES = [
        ('cakes', 'Cakes'),
        ('cookies', 'Cookies'),
        ('cupcakes', 'Cupcakes'),
        ('chocolate', 'Chocolate'),
        ('bread', 'Bread'),
        ('special', 'Special Products'),
    ]

    TYPE_CHOICES = [
        ('simple', 'Simple'),
        ('variable', 'Variable'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    product_type = models.CharField(max_length=10, choices=TYPE_CHOICES)

    initial_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField()
    image = models.ImageField(upload_to='products/')

    slug = models.SlugField(unique=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name