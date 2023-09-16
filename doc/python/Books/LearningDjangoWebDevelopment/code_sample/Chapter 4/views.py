from django.http import HttpResponse
from django.views.generic import View

class Index(View):
def get(self, request): 
return HttpResponse('I am called from a get Request')
def post(self, request): 
return HttpResponse('I am called from a post Request')

urls.py
from django.conf.urls import patterns, include, url
from django.contrib import admin
from tweets.views import Index
admin.autodiscover()

urlpatterns = patterns('',
url(r'^$', Index.as_view()),
url(r'^admin/', include(admin.site.urls)),
)