from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name='dispatch')
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')

        if category:
            queryset = queryset.filter(category=category)

        return queryset