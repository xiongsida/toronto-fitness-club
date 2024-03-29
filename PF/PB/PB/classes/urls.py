app_name = 'classes'
from django.urls import path
from classes.views import ClassesListView, ClassEnrollView, ClassDropView, ClassParentView,ClassScheduleView,ClassHistoryView

urlpatterns = [
    path('classes', ClassesListView.as_view(), name='classes-list'),
    path('classes/<int:class_id>/enroll', ClassEnrollView.as_view(), name='class-enroll'),
    path('classes/<int:class_id>/drop', ClassDropView.as_view(), name='class-drop'),
    path('allclassparents', ClassParentView.as_view(), name='class-all-parents-for-frontend'),
    path('alluserschedules',ClassScheduleView.as_view(),name='alluserschedules-for-frontend'),
    path('alluserhistoryclasses',ClassHistoryView.as_view(),name='alluserhistoryclasses-for-frontend')
]
