from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Place, Booking
from .serializers import PlaceSerializer, BookingSerializer, BookingAdminSerializer
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    
    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class BookingAdminViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingAdminSerializer
    #permission_classes = [permissions.IsAuthenticated]

    @csrf_exempt
    def update(self, request, pk=None):
        try:
            booking = Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BookingAdminSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @csrf_exempt
    def destroy(self, request, pk=None):
        try:
            booking = Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateBookingViewSet(viewsets.ViewSet):
    serializer_class = BookingSerializer  # Define the serializer class

    def create(self, request):
        serializer = self.serializer_class(data=request.data)  # Use self.serializer_class
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class BookingsForPlace(APIView):
    def get(self, request, place_id, event_date):
        try:
            place = Place.objects.get(pk=place_id)
            bookings = Booking.objects.filter(is_approved=1,place=place, event_start__date=event_date)
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data)
        except Place.DoesNotExist:
            raise Http404("Place does not exist")
        
class AdminBookingsForPlace(APIView):
    def get(self, request, place_id, event_date):
        try:
            place = Place.objects.get(pk=place_id)
            bookings = Booking.objects.filter(place=place, event_start__date=event_date)
            serializer = BookingAdminSerializer(bookings, many=True)
            return Response(serializer.data)
        except Place.DoesNotExist:
            raise Http404("Place does not exist")
        
from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})
