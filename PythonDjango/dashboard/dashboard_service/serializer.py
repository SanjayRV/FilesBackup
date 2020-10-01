from rest_framework import serializers
from dashboard_service.models import  files, users, user_details, devices


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields =('user_id', 'username', 'originalpassword', 'password', 'email', 'subscription_plan', 'subscription_from', 'subscription_to')

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = files
        fields =('file_id', 'filename', 'device_id', 'device_name', 'file_size', 'file_version')

class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_details
        fields =('subscription_plan', 'user_id')

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = devices
        fields =( 'device_id', 'device_name', 'user_id')