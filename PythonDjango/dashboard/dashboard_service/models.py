from django.db import models

# Create your models here.
# class user(models.Model):
#     username = models.CharField(db_column='username', blank=False, null=False)
#     password = models.TextField(db_column='password', blank=False, null=False)
#     originalpassword = models.TextField(db_column='originalpassword',  blank=False, null=False)
#
#     class Meta:
#         managed = False
#         db_table = 'user'

class users(models.Model):
    user_id = models.IntegerField(db_column='user_id', blank=False, null=False, primary_key=True)
    username = models.TextField(db_column='username', blank=False, null=False)
    password = models.TextField(db_column='password', blank=True, null=True)
    originalpassword = models.TextField( db_column='originalpassword', blank=True, null=True)
    email = models.TextField(db_column='email', blank=True, null=True)
    subscription_plan = models.TextField(db_column='subscription_plan', blank=True, null=True)
    subscription_from = models.DateTimeField (db_column='subscription_from', blank=True, null=True)
    subscription_to = models.DateTimeField(db_column='subscription_to', blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'users'

class files(models.Model):
    file_id = models.IntegerField(db_column='file_id', blank=False, null=False, primary_key=True)
    filename = models.TextField(db_column='filename', blank=False, null=False)
    device_id = models.IntegerField(db_column='device_id', blank=False, null=False)
    device_name = models.TextField(db_column='device_name', blank=False, null=False)
    file_size = models.FloatField(db_column='file_size', blank=False, null=False)
    file_version = models.TextField(db_column='file_version', blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'files'

class user_details(models.Model,):
    subscription_plan = models.TextField(db_column='subscription_plan', blank=False, null=False, primary_key=True)
    user_id = models.IntegerField(db_column='user_id', blank=False, null=False)
    class Meta:
        managed = False
        db_table = 'user_details'

class devices(models.Model,):
    device_id = models.IntegerField(db_column='device_id', blank=False, null=False, primary_key=True)
    device_name = models.TextField(db_column='device_name', blank=False, null=False)
    user_id = models.IntegerField(db_column='user_id', blank=False, null=False)
    class Meta:
        managed = False
        db_table = 'devices'
