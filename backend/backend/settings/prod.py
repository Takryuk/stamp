import pathlib
from dotenv import dotenv_values
from .base import *

# config = dotenv_values(".env")
config = dotenv_values(BASE_DIR/".env")

SECRET_KEY = config['SECRET_KEY']

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'request_en',
        'USER': config['DB_USER'],
        'PASSWORD': config['DB_PASSWORD'],
        'HOST': 'localhost',
        'PORT': '5432',
        'ATOMIC_REQUESTS':True,
    }
}


ALLOWED_HOSTS = ["stamp.request-box.com","118.27.15.70"]

CORS_ALLOWED_ORIGINS = []



# MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_ROOT = "/var/www/stamp/media"

MEDIA_URL = '/media/'

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR/'build/static',
    BASE_DIR/'static',
]

STATIC_ROOT = "/var/www/stamp/static"


EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
SENDGRID_API_KEY = config['SENDGRID_API_KEY']
SENDGRID_SANDBOX_MODE_IN_DEBUG = False
EMAIL_HOST = 'smtp.sendgrid.net'
EMAI_HOST_USER = 'apikey'
EMAIL_PORT = 587
EMAI_HOST_PASSWORD=config['SENDGRID_API_KEY']
EMAIL_USE_LOCALTIME = True
EMAIL_USE_TLS=True

DEFAULT_FROM_EMAIL = SERVER_EMAIL = 'support@stamp.request-box.com'