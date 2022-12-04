from django_filters import rest_framework as filters
from studios.models.studio import Studio

from django_filters import Filter
from django_filters.fields import Lookup


class MultiValueCharFilter(filters.BaseCSVFilter, filters.CharFilter):
    def filter(self, qs, value):
        # value is either a list or an 'empty' value
        values = value or []
        for value in values:
            qs = super(MultiValueCharFilter, self).filter(qs, value)
        return qs

class StudioFilter(filters.FilterSet):
    amenities__type = MultiValueCharFilter(field_name='amenities__type')
    classes__name = MultiValueCharFilter(field_name='classes__name')

    class Meta:
        model = Studio
        fields = ['name','amenities__type','classes__name','classes__coach']