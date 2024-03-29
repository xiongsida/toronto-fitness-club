from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from studios.models.studio import Studio
from classes.models.classInstance import ClassInstance
from classes.models.classParent import ClassParent
from classes.serializers import ClassInstanceSerializer, ClassParentSerializer, ClassInstanceIDSerializer
from accounts.models import TFCUser
from studios.pagination import CustomPagination
from classes.filter import ClassInstanceFilter
from django.db.models import Q
import datetime
from accounts.permissions import isSubscribed
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ClassParentView(ListAPIView):
    serializer_class = ClassParentSerializer
    def get_queryset(self):
        return ClassParent.objects.all()
    
class ClassScheduleView(ListAPIView):
    serializer_class = ClassInstanceIDSerializer
    def get_queryset(self):
        if not self.request.user:
            return []
        student=self.request.user
        q11=Q(is_cancelled=False)
        q22=Q(date__gt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__gte=datetime.datetime.now().time()))
        queryset=student.class_instances.filter(q11 & q22).order_by('date','start_time','end_time')
        return queryset
    
class ClassHistoryView(ListAPIView):
    serializer_class = ClassInstanceIDSerializer
    def get_queryset(self):
        if not self.request.user:
            return []
        student=self.request.user
        q33=Q(date__lt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__lte=datetime.datetime.now().time()))
        queryset=student.class_instances.filter(q33).order_by('date','start_time','end_time') 
        return queryset

class ClassesListView(ListAPIView):
    serializer_class = ClassInstanceSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ClassInstanceFilter
    search_fields = ['class_parent__name','coach','date','start_time','end_time']
    # permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        studio_id=self.request.GET.get('studio_id',None)
        scope=self.request.GET.get('scope',None)
        if self.request.user and scope: # if scope is specified, we think the user want to list his own classes
            student=self.request.user
            scope=self.request.GET.get('scope',None)
            queryset=student.class_instances.all().order_by('date','start_time','end_time')
            if scope=="myschedule":
                q11=Q(is_cancelled=False)
                q22=Q(date__gt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__gte=datetime.datetime.now().time()))
                queryset=queryset.filter(q11 & q22).order_by('date','start_time','end_time')
            elif scope=="myhistory":
                q33=Q(date__lt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__lte=datetime.datetime.now().time()))
                queryset=queryset.filter(q33).order_by('date','start_time','end_time')           
            if studio_id:
                studio=get_object_or_404(Studio, id=studio_id)
                classParents=studio.classes.all()
                classParent_ids=[x.id for x in classParents]
                q1=Q(class_parent__id__in=classParent_ids)
                q2=Q(is_cancelled=False)
                q3=Q(date__gt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__gte=datetime.datetime.now().time()))
                queryset=queryset.filter(q1 & q2 & q3).order_by('date','start_time','end_time')
            return queryset
        elif studio_id:
            studio=get_object_or_404(Studio, id=studio_id)
            classParents=studio.classes.all()
            classParent_ids=[x.id for x in classParents]
            q1=Q(class_parent__id__in=classParent_ids)
            q2=Q(is_cancelled=False)
            q3=Q(date__gt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__gte=datetime.datetime.now().time()))
            queryset=ClassInstance.objects.filter(q1 & q2 & q3).order_by('date','start_time','end_time')
            return queryset
        else:
            q2=Q(is_cancelled=False)
            q3=Q(date__gt=datetime.date.today()) | (Q(date=datetime.date.today())&Q(start_time__gte=datetime.datetime.now().time()))    
            return ClassInstance.objects.filter(q2 & q3).order_by('date','start_time','end_time')


class ClassEnrollView(APIView):
    permission_classes=[IsAuthenticated,isSubscribed]
    def post(self,request, *args, **kwargs):
        if not request.user:
            return Response({'detail':{'error':'you are not logged in'}})
        student=get_object_or_404(TFCUser,id=request.user.id)
        print(request.data)
        apply_for_future=request.data.get('for_future',"0")
        class_instance_id=kwargs.get('class_id',None)
        classinstance=get_object_or_404(ClassInstance,id=class_instance_id)
        class_parent_id=classinstance.class_parent.id
        classparent=get_object_or_404(ClassParent,id=class_parent_id)
        
        if datetime.datetime.combine(classinstance.date,classinstance.start_time)<=datetime.datetime.now():
            return Response({'detail':{'error':'enroll failed, the class you selected was in the past'}})
        # print(classinstance.capacity)
        if classinstance.capacity>len(classinstance.students.all()):
            student.class_instances.add(classinstance)
        else:
            return Response({'detail':{'error':'enroll failed, this class is full'}})
        
        # print(request.user.username)
        # last_valid_day=last_day_of_subscription(student)
        # print(last_valid_day)
        # if last_valid_day <= datetime.datetime.combine(classinstance.date,classinstance.start_time):
        #     return Response({'detail':{'error':'enroll failed, you do not have valid subscription in that time'}})
        
        if classinstance.is_cancelled==False:
            student.class_instances.add(classinstance)
        else:
            return Response({'detail':{'error':'enroll failed, this class is cancelled'}})
        
        
        invalid_classes=[]
        if apply_for_future=="1":
            student.class_parents.add(classparent)
            future_instances=ClassInstance.objects.filter(Q(class_parent__id=class_parent_id) & Q(date__gt=classinstance.date))
            for future_instance in future_instances:
                if future_instance.capacity>len(future_instance.students.all()) and (not future_instance.is_cancelled): 
                    # and last_valid_day > datetime.datetime.combine(classinstance.date,classinstance.start_time):
                    student.class_instances.add(future_instance)
                else:
                    invalid_classes.append(future_instance.id)
                
        return Response({'detail':{'success':'enroll success!'}}) if not invalid_classes else Response({'detail':{'success':'enroll success, we help you enroll parts of classes you choose, because you do not have subscription at that time or some classes are full already'}})

class ClassDropView(APIView):
    permission_classes=[IsAuthenticated,isSubscribed]
    def post(self,request, *args, **kwargs):
        if not request.user:
            return Response({'detail':{'error':'you are not logged in'}})
        student=request.user

        apply_for_future=request.data.get('for_future',"0")
        class_instance_id=kwargs.get('class_id',None)
        
        classinstance=get_object_or_404(ClassInstance,id=class_instance_id)
        class_parent_id=classinstance.class_parent.id
        classparent=get_object_or_404(ClassParent,id=class_parent_id)
        
        if datetime.datetime.combine(classinstance.date,classinstance.start_time)<=datetime.datetime.now():
            return Response({'detail':{'error':'drop not allowed, the class you selected was in the past'}})
        
        student.class_instances.remove(classinstance)
        
        if apply_for_future=="1":
            student.class_parents.remove(classparent)
            future_instances=ClassInstance.objects.filter(Q(class_parent__id=class_parent_id) & Q(date__gt=classinstance.date))
            for future_instance in future_instances:
                student.class_instances.remove(future_instance)
                
        return Response({'detail':{'success':'drop success!'}})
        