from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"

# Signals to automatically create UserProfile when User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()