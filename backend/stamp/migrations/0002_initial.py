# Generated by Django 4.0.2 on 2022-02-22 13:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('stamp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='stamp',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.profile'),
        ),
    ]
