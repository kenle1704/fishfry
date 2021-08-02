from django.db import models

class Boat(models.Model):
	plate_number = models.CharField( max_length=20)
	boat_type = models.CharField( max_length=20)
	description = models.TextField(blank=True, null=True)
	createdAt = models.DateTimeField("Created At", auto_now_add=True)
        	
	def __str__(self):
		return self.plate_number

class Guide(models.Model):
	first_name = models.CharField( max_length=20)
	last_name = models.CharField( max_length=20)
	description = models.TextField(blank=True, null=True)
	createdAt = models.DateTimeField("Created At", auto_now_add=True)
        	
	def __str__(self):
		return self.first_name

class SwimLanes(models.Model):
	name = models.CharField( max_length=20)
	description = models.TextField(blank=True, null=True)
	createdAt = models.DateTimeField("Created At", auto_now_add=True)
        	
	def __str__(self):
		return self.name

class BoatService(models.Model):
        boat = models.ForeignKey(Boat, on_delete=models.CASCADE)
        guide = models.ForeignKey(Guide,on_delete=models.CASCADE)
        swimlanes = models.ForeignKey(SwimLanes,on_delete=models.CASCADE)
        description = models.TextField(blank=True, null=True)
        createdAt = models.DateTimeField("Created At", auto_now_add=True)
        modifiedAt = models.DateTimeField("Modified At", auto_now_add=True)
        def __str__(self):
            return self.boat
