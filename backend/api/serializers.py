from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "category",
            "description",
            "price",
            "image",
        ]

    def get_image(self, obj):
        request = self.context.get("request")

        if obj.image:
            url = obj.image.url

            # If request exists → return full URL
            if request:
                return request.build_absolute_uri(url)

            # fallback (very important)
            return url

        return None