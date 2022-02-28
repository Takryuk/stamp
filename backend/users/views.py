# from django.shortcuts import render
# from django.http.response import JsonResponse
# from django.db import transaction
# from urllib.parse import parse_qsl

# from requests_oauthlib import OAuth1Session
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import generics
# from rest_framework import (
#     # generics,
#     status,
# )

# from .serializers import UserProfileSerializer, ProfileSerializer, PublicProfileSerializer
# from .models import Profile
# from common.permissions import ReadOnly

# # Create your views here.


# # Create your views here.


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def username_change(request):
#     if(request.data):
#         username = request.data.get('username')

#     # serializer = ProfileSerializer(request.user, data={'username':username}, partial=True)
#     serializer = ProfileSerializer(request.user.profile, data={'username':username}, partial=True)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()

#         # self.perform_update(serializer)
#         return Response(serializer.data)  
#     return Response(serializer.errors)  


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def profile_change(request):
#     profile=request.user.profile.profile
#     if(request.data):
#         profile = request.data.get('profile')

#     serializer = ProfileSerializer(request.user.profile, data={'profile':profile}, partial=True)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data)  
#     return Response(serializer.errors)  


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def image_change(request):
#     image=request.user.profile.image
#     if(request.data):
#         image = request.data.get('image')

#     serializer = ProfileSerializer(request.user.profile, data={'image':image}, partial=True)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data)  
#     return Response(serializer.errors)  


# class PublicProfileView(generics.RetrieveAPIView):
#     serializer_class = PublicProfileSerializer
#     queryset = Profile
#     permission_classes = [IsAuthenticated|ReadOnly]


# # @api_view(['PATCH'])
# # @permission_classes([IsAuthenticated])
# # def stamp(request):
# #     mode = request.data.get('mode')
# #     profile=request.user.profile

# #     if mode==0:
# #         profile.start = datetime.datetime.now()
# #         profile.update()

# #     elif mode==1:
# #         profile.break_start = datetime.datetime.now()
# #         profile.update()    
# #     elif mode==2:
# #         profile.break_end = datetime.datetime.now()
# #         profile.update()    
# #     elif mode==3:
# #         profile.end = datetime.datetime.now()
# #         Stamp.objects.create(
# #             start=profile.start,
# #             break_start=profile.break_start,
# #             break_end=profile.break_end,
# #             end=profile.end,
# #             employee=profile,
# #             company=profile.company
# #         )
# #         profile.start = None
# #         profile.break_start = None
# #         profile.break_end = None
# #         profile.end = None
# #         profile.update()

# #     serializer = ProfileSerializer(profile)
# #     if serializer.is_valid(raise_exception=True):
# #         return Response(serializer.data)  
# #     return Response(serializer.errors)  
