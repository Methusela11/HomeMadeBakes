from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Welcome to RMEKS Bakery API",
        "endpoints": {
            "products": "/api/products/",
            "admin": "/admin/"
        }
    })

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')

        if category:
            queryset = queryset.filter(category=category)

        return queryset