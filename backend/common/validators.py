from django.core.exceptions import ValidationError
# from django.core import validators


def validate_image(image):
    file_size = image.size
    limit_mb = 5
    if file_size > limit_mb * 1024 * 1024:
        raise ValidationError("Max size of file is %s MB" % limit)

    return image

