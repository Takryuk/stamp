import pytz
from django.conf import settings
from django.db import models
from django.utils.timezone import make_aware

from company.models import Company
from users.models import Profile
# Create your models here.

class Stamp(models.Model):
    start = models.DateTimeField()
    break_start = models.DateTimeField(null=True, blank=True)
    break_end = models.DateTimeField(null=True, blank=True)
    end = models.DateTimeField()
    employee = models.ForeignKey(Profile, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.employee.username+' '+self.start.astimezone(pytz.timezone(settings.TIME_ZONE)).strftime('%Y/%m/%d %H:%M:%S')

    class Meta:
        ordering=['-id']