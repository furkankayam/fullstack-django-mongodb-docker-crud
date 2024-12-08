from django.db import models

# Create your models here.

class User(models.Model):
    UserId = models.AutoField(primary_key=True, unique=True, blank=True)
    age = models.IntegerField()
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.UserId is None:
            last_user = User.objects.all().order_by('-UserId').first()
            self.UserId = last_user.UserId + 1 if last_user else 1
        super(User, self).save(*args, **kwargs)