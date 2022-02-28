import pathlib
from dotenv import dotenv_values
from .base import *

config = dotenv_values(BASE_DIR/".env")

SECRET_KEY = config['DEV_SECRET_KEY']

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR/'db.sqlite3',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'request',
#         'USER': config['DB_USER'],
#         'PASSWORD': config['DB_PASSWORD'],
#         'HOST': 'localhost',
#         'PORT': '5432',
#         'ATOMIC_REQUESTS':True,
#     }
# }

ALLOWED_HOSTS = []


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = config['EMAIL_HOST_USER']
EMAIL_HOST_PASSWORD = config['EMAIL_HOST_PASSWORD']
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = SERVER_EMAIL = 'support@stamp.request-box.com'

MEDIA_ROOT = BASE_DIR / 'media_root'

MEDIA_URL = '/media/'

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR/'build/static',
    BASE_DIR/'static',
]

STATIC_ROOT = BASE_DIR/"static_root"

