from django.urls import path
from . import views

urlpatterns = [
    path('calculate-ttr/', views.calculate_ttr),
]
