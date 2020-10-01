import json

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.shortcuts import render
from django.db.models import Subquery


from dashboard_service.models import  files, user_details, devices, users

from dashboard_service.serializer import UserSerializer, FileSerializer, SubSerializer, DeviceSerializer

from rest_framework.response import Response
from django.db import connection, transaction

# Create your views here.
class userDetails (generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        try:
            # details = users.objects.all()
            # details = users.objects.values_list('username', named=True).all()
            details = users.objects.filter(email=request.query_params["email"])
            user_serialized = UserSerializer(details, many=True)
            if user_serialized.data.__len__() == 0:
                raise Exception("No user exists:"+request.query_params["email"])
            return Response(user_serialized.data, status=200)
        except Exception as e:
            print(e)
            return Response(e.args, status=404)

class fileDetails(generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        try:
            # details = files.objects.all()
            details = files.objects.filter(filename=request.query_params["filename"])
            file_serialized = FileSerializer(details, many=True)
            if file_serialized.data.__len__() == 0:
                raise Exception("No files exists:"+request.query_params["filename"])
            return Response(file_serialized.data, status=200)
        except Exception as e:
            print(e)
            return Response(e.args, status=404)

class fileVersions(generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        try:
            details = files.objects.all()
            # details = files.objects.filter(filename=request.query_params["filename"])
            file_serialized = FileSerializer(details, many=True)
            if file_serialized.data.__len__() == 0:
                raise Exception("No files exists:"+request.query_params["filename"])
            return Response(file_serialized.data, status=200)
        except Exception as e:
            print(e)
            return Response(e.args, status=404)

class subs_details(generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        try:
            # details = user_details.objects.all()
            # details = user_details.raw('SELECT * FROM user_details')
            # details = user_details.objects.filter(user_id=request.query_params["user_id"])
            details = user_details.objects.filter(user_id=2)
            subs_serialized= SubSerializer(details, many=True)
            if subs_serialized.data.__len__() == 0:
                raise Exception("No user exists:"+request.query_params["filename"])
            return Response(subs_serialized.data, status=200)
        except Exception as e:
            print(e)
            return Response(e.args, status=404)


class filesInDevices(generics.RetrieveAPIView):
    def post(self,request, *args , **kwargs):
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT filename, device_name FROM files WHERE device_id IN"
                           "(SELECT device_id FROM devices WHERE email =" + request.query_params["email"] + ") ORDER BY device_id ")
            row = cursor.fetchall()
            if row.__len__() == 0:
                raise Exception("No files for this user_id:"+request.query_params["user_id"])
            cursor.close()
            # details= json.dumps(row)
            # return Response(details, status=200)
            return Response(row, status=200)
        except Exception as e:
            print("An exception occured: ", e)
            return Response(e.args, status=400)

class filesForGraph(generics.RetrieveAPIView):
    def post(self,request, *args , **kwargs):
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT device_name, COUNT(filename) FROM files WHERE device_id IN"
                           "(SELECT device_id FROM devices WHERE email =" + request.query_params["email"] + ") GROUP BY device_id ")
            row = cursor.fetchall()
            if row.__len__() == 0:
                raise Exception("No files for this user_id:"+request.query_params["user_id"])
            cursor.close()
            # details= json.dumps(row)
            # return Response(details, status=200)
            return Response(row, status=200)
        except Exception as e:
            print("An exception occured: ", e)
            return Response(e.args, status=400)



class filesInBin(generics.RetrieveAPIView):
    def post(self,request, *args , **kwargs):
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT filename, device_id FROM bin WHERE device_id IN"
                           "(SELECT device_id FROM devices WHERE email =" + request.query_params["email"] + ") ORDER BY device_id ")
                            # "(SELECT device_id FROM devices WHERE email = 'sanjay') ORDER BY device_id ")
            row = cursor.fetchall()
            if row.__len__() == 0:
                raise Exception("No files for this user_id:"+request.query_params["user_id"])
            cursor.close()
            # details= json.dumps(row)
            # return Response(details, status=200)
            return Response(row, status=200)
        except Exception as e:
            print("An exception occured: ", e)
            return Response(e.args, status=400)

