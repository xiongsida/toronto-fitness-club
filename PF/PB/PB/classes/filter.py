from django_filters import rest_framework as filters
from classes.models.classInstance import ClassInstance
# from studios.filter import MultiValueCharFilter

class ClassInstanceFilter(filters.FilterSet):
    date_range_start = filters.DateFilter(field_name="date", lookup_expr='gte')
    date_range_end = filters.DateFilter(field_name="date", lookup_expr='lte')
    
    time_range_start = filters.TimeFilter(field_name='start_time', lookup_expr="gte")
    time_range_end = filters.TimeFilter(field_name='end_time', lookup_expr='lte')
    
    # class_parent__name = MultiValueCharFilter(field_name='class_parent__name')

    class Meta:
        model = ClassInstance
        fields = ['class_parent__name','coach','date']