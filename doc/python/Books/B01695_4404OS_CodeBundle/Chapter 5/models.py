from django.db import models 
from django.contrib.auth.models import AbstractBaseUser 

class HashTag(models.Model):
    """
	HashTag model
    """
    name = models.CharField(max_length=64, unique=True)
    tweet = models.ManyToManyField(Tweet)

    def __unicode__(self):
        return self.name


class User(AbstractBaseUser): 
	""" 
	Custom user class. 
	""" 
	username = models.CharField( 'username', max_length=10, unique=True, db_index=True) 
	email = models.EmailField('email address', unique=True) 
	joined = models.DateTimeField(auto_now_add=True) 
	is_active = models.BooleanField(default=True) 
	is_admin = models.BooleanField(default=False) 

	USERNAME_FIELD = 'username' 

	def __unicode__(self): 
	return self.username