from django.http import HttpResponse

class PostTweet(View):
		    """Tweet Post form available on page /user/<username> URL"""
		    def post(self, request, username):
		        form = TweetForm(self.request.POST)
		        if form.is_valid():
		            user = User.objects.get(username=username)
		            tweet = Tweet(text=form.cleaned_data['text'],
		                                         user=user,
		                                         country=form.cleaned_data['country'])
		            tweet.save()
		            words = form.cleaned_data['text'].split(" ")
		            for word in words:
		                if word[0] == "#":
		                    hashtag, created = HashTag.objects.get_or_create(name=word[1:])
		                    hashtag.tweet.add(tweet)
		        return HttpResponseRedirect('/user/'+username)


def index(request):
if request.method == 'GET': 
return HttpResponse('I am called from a get Request')
elif request.method == 'POST':
return HttpResponse('I am called from a post Request')

