from django.urls import path, re_path
from .views import ProductListView, RegisterView, LoginView, ProfileView, LogoutView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='products'),
    path('products', ProductListView.as_view(), name='products_no_slash'),
    
    # Add both with and without trailing slashes
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/register', RegisterView.as_view(), name='register_no_slash'),
    
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/login', LoginView.as_view(), name='login_no_slash'),
    
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/profile', ProfileView.as_view(), name='profile_no_slash'),
    
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/logout', LogoutView.as_view(), name='logout_no_slash'),
]