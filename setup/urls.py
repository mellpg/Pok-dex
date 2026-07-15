from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pokedex.urls')),  # Garanta que o arquivo pokedex/urls.py existe
]