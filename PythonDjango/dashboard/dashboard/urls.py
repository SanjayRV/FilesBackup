"""dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dashboard_service.views import userDetails, fileDetails, subs_details, filesInDevices, filesInBin, fileVersions, \
    filesForGraph

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dashboard/userDetails', userDetails.as_view()),
    path('api/dashboard/fileDetails', fileDetails.as_view()),
    path('api/dashboard/fileVersions', fileVersions.as_view()),
    path('api/dashboard/subsDetails', subs_details.as_view()),
    path('api/dashboard/filesInDevices', filesInDevices.as_view()),
    path('api/dashboard/filesForGraph', filesForGraph.as_view()),
    path('api/dashboard/filesInBin', filesInBin.as_view()),

]
