import datetime
from pytz import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render
from django.utils.timezone import make_aware

from rest_framework.response import Response

from rest_framework import generics, serializers

from common.pagination import StandardResultsPagination
from common.permissions import (
    ReadOnly,
    IsAdminUser,
)

from users.serializers import ProfileSerializer
from .serializers import (
    StampListSerializer
)
from .models import Stamp

class StampList(generics.ListAPIView):
    # queryset = Reservation.objects.all()
    serializer_class = StampListSerializer
    pagination_class = StandardResultsPagination
    permission_classes = [IsAdminUser]
    # ordering = ['-created_at']

    def get_queryset(self):
        # print(self.request.user)
        company = self.request.user.profile.company
        stamps = Stamp.objects.filter(company=company)
        return stamps

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def stamp(request):
    mode = int(request.data.get('mode'))
    profile=request.user.profile
    now = make_aware(datetime.datetime.now())

    if mode==0:
        profile.start = now
        profile.state=1
        profile.save()


    elif mode==1:
        profile.break_start = now
        profile.state=2

        profile.save()    
    elif mode==2:
        profile.break_end = now
        profile.state=3
        profile.save()    
    elif mode==3:
        profile.end = now
        profile.state=0
        Stamp.objects.create(
            start=profile.start,
            break_start=profile.break_start,
            break_end=profile.break_end,
            end=profile.end,
            employee=profile,
            company=profile.company
        )
        profile.start = None
        profile.break_start = None
        profile.break_end = None
        profile.end = None
        profile.save()
    


    serializer = ProfileSerializer(profile)
    # if serializer.is_valid(raise_exception=True):
    return Response(serializer.data)  
    # return Response(serializer.errors)  