# Generated by Django 2.2 on 2020-09-15 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard_service', '0002_auto_20200915_0602'),
    ]

    operations = [
        migrations.CreateModel(
            name='files',
            fields=[
                ('filename', models.TextField(db_column='filename', primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'files',
                'managed': False,
            },
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
    ]