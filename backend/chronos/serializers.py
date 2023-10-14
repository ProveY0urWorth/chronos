from rest_framework import serializers
from .models import Place, Booking

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        exclude = ('is_approved',)  # Exclude the 'is_approved' field

    
        
class BookingAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'