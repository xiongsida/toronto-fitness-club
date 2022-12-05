from rest_framework import pagination
from rest_framework.response import Response

class CustomPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 30
    
    def get_from(self):
        return int((self.page.paginator.per_page * self.page.number) - self.page.paginator.per_page + 1)

    def get_to(self):
        return self.get_from() + int(len(self.page.object_list)) - 1
    
    def get_paginated_response(self, data):
        return Response({
            'page':{
                'totalItems': self.page.paginator.count,
                'totalPages': self.page.paginator.num_pages,
                'pageSize': self.page_size,
                'currentPage': self.page.number,
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'from': self.get_from(),
                'to': self.get_to(),
            },
            'results': data,
        })


class SubscriptionPagination(pagination.PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 30
