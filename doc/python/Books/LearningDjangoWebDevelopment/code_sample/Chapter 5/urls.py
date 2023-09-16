from django.conf.urls import patterns, include, url
from django.contrib import admin
from tweet.views import Index, Profile, PostTweet

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', Index.as_view()),
    url(r'^user/(\w+)/$', Profile.as_view()),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^user/(\w+)/post/$', PostTweet.as_view())
)
