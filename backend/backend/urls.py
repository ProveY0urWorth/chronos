"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from chronos.views import PlaceViewSet, BookingAdminViewSet, CreateBookingViewSet, BookingsForPlace, AdminBookingsForPlace, get_csrf_token
from django.contrib.auth import views as auth_views
from cauth.views import UserLoginView, CreateUserView

router = DefaultRouter()
router.register(r'admin/bookings', BookingAdminViewSet)

urlpatterns = [
    path('api/admin/bookings/<int:pk>/', BookingAdminViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='booking-detail'),
    path('api/register/', CreateUserView.as_view(), name='user-register'),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
    path('api/places/list/', PlaceViewSet.as_view({'get': 'list'}), name='place-list'),
    path('api/bookings/create', CreateBookingViewSet.as_view({'post': 'create'}), name='create-booking'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/bookings/<int:place_id>/<str:event_date>/', BookingsForPlace.as_view(), name='bookings-for-place'),
    path('api/admin/bookings/<int:place_id>/<str:event_date>/', AdminBookingsForPlace.as_view(), name='bookings-for-place'),
    path('api/get-csrf-token/', get_csrf_token, name='get_csrf_token'),
]

