from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import * 
from .serializers import *


@api_view(['GET', 'POST'])
def boats_list(request):
    """
 List  boats, or create a new boat.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        boats = Boat.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(boats, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = BoatSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/boats/?page=' + str(nextPage), 'prevlink': '/api/boats/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = BoatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def boats_detail(request, pk):
    """
 Retrieve, update or delete a boat by id/pk.
 """
    try:
        boat = Boat.objects.get(pk=pk)
    except Boat.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BoatSerializer(boat,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BoatSerializer(boat, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        boat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
                
@api_view(['GET', 'POST'])
def guides_list(request):
    """
 List  guides, or create a new guide.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        guides = Guide.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(guides, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = GuideSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/guides/?page=' + str(nextPage), 'prevlink': '/api/guides/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = GuideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def guides_detail(request, pk):
    """
 Retrieve, update or delete a guide by id/pk.
 """
    try:
        guide = Guide.objects.get(pk=pk)
    except Guide.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GuideSerializer(guide,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = GuideSerializer(guide, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        guide.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
@api_view(['GET', 'POST'])
def swimlanes_list(request):
    """
 List  swimlanes, or create a new swimlane.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        swimlanes = SwimLanes.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(swimlanes, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = SwimLaneSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/swimlanes/?page=' + str(nextPage), 'prevlink': '/api/swimlanes/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = SwimLaneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def swimlanes_detail(request, pk):
    """
 Retrieve, update or delete a swimlane by id/pk.
 """
    try:
        swimlane = SwimLanes.objects.get(pk=pk)
    except SwimLanes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SwimLaneSerializer(swimlane,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SwimLaneSerializer(swimlane, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        swimlane.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
@api_view(['GET', 'POST'])
def boatservice_list(request):
    """
 List  boatservices, or create a new boatservice.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        boatservices = BoatService.objects.all()
        page = request.GET.get('page', 1)
        # assume that each page can display 100 of boat records
        paginator = Paginator(boatservices,100) 
        swimlanes = SwimLanes.objects.all()
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        serializer_swimlanes = SwimLaneSerializer(swimlanes,context={'request': request} ,many=True)
        serializer = BoatServicesSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'swimlanes':serializer_swimlanes.data, 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/boatservice/?page=' + str(nextPage), 'prevlink': '/api/boatservice/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = BoatServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def boatservice_detail(request, pk):
    """
 Retrieve, update or delete a boatservice by id/pk.
 """
    boats = Boat.objects.all()
    guides = Guide.objects.all()
    swimlanes = SwimLanes.objects.all()
    serializer_boats = BoatSerializer(boats,context={'request': request} ,many=True)
    serializer_swimlanes = SwimLaneSerializer(swimlanes,context={'request': request} ,many=True)
    serializer_guide = GuideSerializer(guides,context={'request': request} ,many=True)
    try:
        boatservice = BoatService.objects.get(pk=pk)
    except BoatService.DoesNotExist:
        return Response({'data':[],'boats':serializer_boats.data,'guides':serializer_guide.data,'swimlanes':serializer_swimlanes.data})
    if request.method == 'GET':
        serializer = BoatServicesSerializer(boatservice,context={'request': request})
        return Response({'data':serializer.data,'boats':serializer_boats.data,'guides':serializer_guide.data,'swimlanes':serializer_swimlanes.data})

    elif request.method == 'PUT':
        serializer = BoatServiceSerializer(boatservice, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        boatservice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
                
