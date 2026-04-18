from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    
    # Fix the reverse accessor clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Changed from 'user_set'
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',  # Changed from 'user_set'
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']
    
    def __str__(self):
        return self.email