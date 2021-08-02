from rest_framework import serializers
from .models import *

class BoatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Boat 
        fields = ('pk','plate_number', 'boat_type', 'description')
        
class GuideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Guide 
        fields = ('pk','first_name', 'last_name', 'description')
        
class SwimLaneSerializer(serializers.ModelSerializer):

    class Meta:
        model = SwimLanes 
        fields = ('pk','name', 'description')
# serializer for update and create only
class BoatServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatService
        fields = ('pk','boat','guide','swimlanes','description')

class BoatServicesSerializer(serializers.ModelSerializer):
    plate_number = serializers.SerializerMethodField()
    def get_plate_number(self,obj):
        return obj.boat.plate_number
    first_name = serializers.SerializerMethodField()
    def get_first_name(self,obj):
        return obj.guide.first_name
    last_name = serializers.SerializerMethodField()
    def get_last_name(self,obj):
        return obj.guide.last_name
    name = serializers.SerializerMethodField()
    def get_name(self,obj):
        return obj.swimlanes.name
    
    class Meta:
        model = BoatService 
        fields = ('pk','boat','guide','swimlanes','plate_number', 'name', 'first_name','last_name','modifiedAt','description')
        
