from django.shortcuts import render

# Create your views here.


def index(request):
    # Mudou aqui de 'pokedex/index.html' para apenas 'index.html'
    return render(request, "index.html")
