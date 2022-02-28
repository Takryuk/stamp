import datetime
import pytz
from django.test import TestCase
from django.conf import settings
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from .models import Stamp
from company.models import Company
from users.models import User, Profile
from .serializers import StampListSerializer
from .views import StampList, stamp

# Create your tests here.
User = get_user_model()


class MessageModelTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_is_empty(self):
        """初期状態では何も登録されていないことをチェック"""  
        saved_posts = Stamp.objects.all()
        self.assertEqual(saved_posts.count(), 0)


    def test_is_count_one(self):
        """1つレコードを適当に作成すると、レコードが1つだけカウントされることをテスト"""
        now = datetime.datetime.now().astimezone(pytz.timezone(settings.TIME_ZONE))
        user = User.objects.create_user(
            email='test@gmail.com',
            password='test',
        )
        company = Company.objects.create(
            name='test company',
        )

        profile = Profile.objects.create(
            user=user,
            username='test user',
            company=company,
            employee_id='test employee id',
        )
        stamp = Stamp(
            start=now,
            break_start=now,
            break_end=now,
            end=now,
            employee=profile,
            company=company,
        )
        stamp.save()
        saved_stamps = Stamp.objects.all()
        self.assertEqual(saved_stamps.count(), 1)
        self.assertEqual(saved_stamps[0].start, now)


    # def test_saving_and_retrieving_post(self):
    #     """内容を指定してデータを保存し、すぐに取り出した時に保存した時と同じ値が返されることをテスト"""
    #     post = Stamp()
    #     stamp = 'test_message'
    #     post.stamp = stamp
    #     post.save()
    #     saved_posts = Stamp.objects.all()
    #     actual_post = saved_posts[0]

    #     self.assertEqual(actual_post.stamp, stamp)

    def test_receiver_stamp_list_view_url(self):   
        """stamp list ページへのURLでアクセス可能かテスト"""
        view = resolve('/stamp/list')
        self.assertEqual(view.func.view_class, StampList)

    def test_message_create_view_url(self):
        """stamp create ページへのURLでアクセス可能かテスト"""
        view = resolve('/stamp/update')
        self.assertEqual(view.func, stamp)


    def test_get(self):
        """GET メソッドでアクセスしてステータスコード200を返されることを確認"""
        now = datetime.datetime.now().astimezone(pytz.timezone(settings.TIME_ZONE))

        email = "test1@gmail.com"
        password="some_password_123"
        user = User.objects.create_user(email=email, password=password)
        company = Company.objects.create(
            name='test company',
        )
        profile = Profile.objects.create(
            user=user,
            username='test user',
            company=company,
            employee_id='test employee id',
            is_admin=True,
        )
        
        stamp = Stamp(
            start=now,
            break_start=now,
            break_end=now,
            end=now,
            employee=profile,
            company=company,
        )
        self.client.force_login(user)
        res = self.client.get(reverse('stamp:stamp-list'))
        items = Stamp.objects.filter(company=user.profile.company)
        serializer = StampListSerializer(items, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['results'], serializer.data)


    def test_post(self):
        """POST メソッドでアクセスしてステータスコード200を返されることを確認"""
        email = "test1@gmail.com"
        password="some_password_123"
        now = datetime.datetime.now()
        user = User.objects.create_user(email=email, password=password)

        company = Company.objects.create(
            name='test company',
        )
        profile = Profile.objects.create(
            user=user,
            username='test user',
            company=company,
            employee_id='test employee id',
            is_admin=True,
        )
    

        payload = {
            'mode': 0,
        }
        self.client.force_login(user)
        res = self.client.patch(reverse('stamp:update-stamp'), payload)
        profile = Profile.objects.first()
        self.assertEqual(datetime.datetime.fromisoformat(res.data['start']), profile.start)

        payload = {
            'mode': 1,
        }
        res = self.client.patch(reverse('stamp:update-stamp'), payload)
        profile = Profile.objects.first()
        self.assertEqual(datetime.datetime.fromisoformat(res.data['break_start']), profile.break_start)

        payload = {
            'mode': 2,
        }
        res = self.client.patch(reverse('stamp:update-stamp'), payload)
        profile = Profile.objects.first()
        self.assertEqual(datetime.datetime.fromisoformat(res.data['break_end']), profile.break_end)
        
        payload = {
            'mode': 3,
        }
        res = self.client.patch(reverse('stamp:update-stamp'), payload)
        profile = Profile.objects.first()
        self.assertEqual(profile.start, None)
        self.assertEqual(Stamp.objects.count(), 1)

