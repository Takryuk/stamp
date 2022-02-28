from django.core import serializers as django_serializers
from django.db import models
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
# from .models import Comment, Room, JoinUser, GuestJoinUser
from .models import Stamp
# from users.serializers import ProfileSerializer


class StampListSerializer(serializers.ModelSerializer):
    # customer = ProfileSerializer(read_only=True)
    # start_time = serializers.SerializerMethodField()
    # end_time = serializers.SerializerMethodField()
    employee = serializers.SerializerMethodField()
    employee_id = serializers.SerializerMethodField()
    
    class Meta:
        model = Stamp
        fields = (
            'id',
            'start',
            'end',
            'break_start',
            'break_end',
            'employee',
            'employee_id',
        )
        read_only_fields=[
            'id',
            'start',
            'end',
            'break_start',
            'break_end',
            'employee',
            'employee_id',
        ]

    def get_employee(self, obj):
        return obj.employee.username    
    def get_employee_id(self, obj):
        return obj.employee.employee_id
    

class ReservationCreateSerializer(serializers.ModelSerializer):
    # customer = ProfileSerializer(read_only=True)
    # start_time = serializers.SerializerMethodField()
    # end_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Stamp
        fields = (
            'id',
            'start',
            'plan',
            'customer',
            'number',
            'comment',
            'cancelled',
            'restaurant',
        )
        read_only_fields=[
            'id',
            'created_at',
        ]


