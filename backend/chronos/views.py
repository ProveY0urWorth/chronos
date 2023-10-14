from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Place, Booking
from .serializers import PlaceSerializer, BookingSerializer, BookingAdminSerializer

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    
    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class BookingAdminViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingAdminSerializer
    permission_classes = [permissions.IsAuthenticated]


class CreateBookingViewSet(viewsets.ViewSet):
    serializer_class = BookingSerializer  # Define the serializer class

    def create(self, request):
        serializer = self.serializer_class(data=request.data)  # Use self.serializer_class
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)