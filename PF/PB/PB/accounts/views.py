from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import TFCUser
from accounts.serializers import TFCUserSerializer
from rest_framework import generics, permissions, mixins
from accounts.permissions import IsSelfOrReadOnly, isDebugingOrSecretForGet
from studios.pagination import SubscriptionPagination
from rest_framework import status


class UserList(mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):
    queryset = TFCUser.objects.all()
    serializer_class = TFCUserSerializer

    permission_classes = [
        isDebugingOrSecretForGet,
    ]
    pagination_class = SubscriptionPagination

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
        IsSelfOrReadOnly,
    ]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UpdatePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"error": "old password is wrong!"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"success": "success!"}, status=status.HTTP_200_OK)
