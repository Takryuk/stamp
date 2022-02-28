from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.db.models import Sum

from .models import Profile


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):

    company = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'username',
            'is_admin',
            'state',
            'start',
            'break_start',
            'break_end',
            'end',
            'company',


        ]

    def get_company(self, obj):
        return obj.company.name



#プライベートな情報に注意！
class UserProfileSerializer(UserSerializer):

    profile = ProfileSerializer()

    
    class Meta(UserSerializer.Meta):
        model = User
        fields = [
            'id', 
            'email', 
            # 'username',
            # 'profile_id',
            'profile', 
            # 'image',
        ]

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        field = 'profile'
        inner_representation = representation.pop(field)
        if inner_representation:
            for key in inner_representation:
                representation[field+"_"+key] = inner_representation[key]    
        return representation






class PublicProfileSerializer(UserSerializer):
    # username = serializers.SerializerMethodField()
    class Meta(UserSerializer.Meta):
        model = Profile
        fields = ['id', 'username',]



        



