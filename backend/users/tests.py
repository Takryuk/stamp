from django.test import TestCase
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from .models import Profile
# from .views import username_change, profile_change, PublicProfileView
# Create your tests here.
User = get_user_model()


class MessageModelTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_is_empty(self):
        """初期状態では何も登録されていないことをチェック"""  
        saved_posts = User.objects.all()
        self.assertEqual(saved_posts.count(), 0)


    def test_is_count_one(self):
        """1つレコードを適当に作成すると、レコードが1つだけカウントされることをテスト"""
        user = User.objects.create(email="test1@gmail.com", password="test_passoword")
        user.save()
        users = User.objects.all()
        self.assertEqual(users.count(), 1)


    def test_saving_and_retrieving_post(self):
        """内容を指定してデータを保存し、すぐに取り出した時に保存した時と同じ値が返されることをテスト"""
        user = User.objects.create(email="test1@gmail.com", password="test_passoword")
        email = 'test1@gmail.com'
        user.email = email
        user.save()
        users = User.objects.all()
        actual_user = users[0]
        self.assertEqual(actual_user.email, user.email)


    # def test_public_profile_view_url(self):
    #     """public_profile ページへのURLへアクセス可能かをテスト"""
    #     view = resolove('/auth/users/me')
    #     # view = resolve(reverse('users:public-profile', kwargs={'pk':1}))
    #     self.assertEqual(view.func.view_class, PublicProfileView)



    # def test_public_profile(self):
    #     """GET メソッドでアクセスしてステータスコード200を返されることを確認"""
    #     email = "test1@gmail.com"
    #     password="some_password_123"
    #     user = User.objects.create_user(email=email, password=password)
    #     # self.client.force_login(user)

    #     res = self.client.get(resolve('/stamp/list'))
    #     # DBのデータ取得
    #     print(res)
    #     profile = Profile.objects.get(id=res.data['id'])
    #     # status code確認
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    #     # DB内容とpayloadで渡したparamsが一致するか確認
    #     self.assertEqual(user.profile, profile)



