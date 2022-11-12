from accounts.models import TFCUser
from accounts.serializers import TFCUserSerializer
from rest_framework import generics, permissions, mixins
from accounts.permissions import IsSelfOrReadOnly


class UserList(mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):
    queryset = TFCUser.objects.all()
    serializer_class = TFCUserSerializer

    def get_permissions(self, *args, **kwargs):
        if self.request.method == 'POST':
            return []
        else:
            return [permissions.IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetail(mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.DestroyModelMixin,
                 generics.GenericAPIView):

    serializer_class = TFCUserSerializer
    queryset = TFCUser.objects.all()
    permission_classes = [
        # permissions.IsAuthenticated(),
        IsSelfOrReadOnly,
    ]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
