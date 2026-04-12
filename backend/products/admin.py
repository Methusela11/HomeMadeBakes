from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'product_type', 'created_at')
    prepopulated_fields = {'slug': ('name',)}