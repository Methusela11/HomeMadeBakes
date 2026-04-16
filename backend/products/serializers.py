from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Product
from .models import UserProfile  # If you created this model

# Product Serializer (your existing one)
class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

# User Serializers (add these for authentication)
class UserSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone')
    
    def get_phone(self, obj):
        if hasattr(obj, 'profile') and obj.profile:
            return obj.profile.phone
        return ''

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'first_name', 'last_name', 'phone')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Remove phone and password2 from validated_data
        phone = validated_data.pop('phone', '')
        validated_data.pop('password2')
        password = validated_data.pop('password')
        
        # Create user
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        user.set_password(password)
        user.save()
        
        # Create user profile with phone number (if UserProfile model exists)
        try:
            from .models import UserProfile
            UserProfile.objects.create(user=user, phone=phone)
        except ImportError:
            # If UserProfile doesn't exist, just save phone as an attribute
            pass
        
        return user