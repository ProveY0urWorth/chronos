from django.db import models

class Place(models.Model):
    unique_id = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    building = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
            return f'Place: {self.name}, Building: {self.building}, Description: {self.description}'
        
    class Meta:
        db_table = 'Places'

class Booking(models.Model):
    unique_id = models.AutoField(primary_key=True)  
    full_name = models.CharField(max_length=255, blank=False, null=False)
    phone_number = models.CharField(max_length=15, blank=False, null=False)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, blank=False, null=False)
    event_start = models.DateTimeField(blank=False, null=False)
    event_end = models.DateTimeField(blank=False, null=False)
    technical_equipment = models.TextField(blank=True, null=True)
    organizer_info = models.TextField(blank=False, null=False)
    role = models.IntegerField( blank=False, null=False)
    is_approved = models.BooleanField(default=False, null=False, blank=False)
    
    def __str__(self):
        return self.full_name

    class Meta:
        db_table = 'Bookings'