# Generated by Django 4.0.2 on 2022-02-27 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stamp', '0004_alter_stamp_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stamp',
            name='start',
            field=models.DateTimeField(),
        ),
    ]
