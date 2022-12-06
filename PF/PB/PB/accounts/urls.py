from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from accounts import views
urlpatterns = [
    path('users', views.UserList.as_view(), name='tfcuser-list'),
    path('users/<int:pk>', views.UserDetail.as_view(), name='tfcuser-detail'),
    path('update-password', views.UpdatePasswordView.as_view(),
         name="update-password"),

]


urlpatterns = format_suffix_patterns(urlpatterns)
