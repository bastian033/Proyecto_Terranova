from django.shortcuts import render

def inicio(request):
    return render(request, 'inicio.html')

def quienesSomos(request):
    return render(request, 'quienesSomos.html')