from accounts.models import TFCUser
import jwt
from PB.settings import SIMPLE_JWT
from django.urls import reverse
from rest_framework_simplejwt.views import TokenVerifyView


class MyTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        token = request.data.get('token')
        token_data = jwt.decode(
            token,
            SIMPLE_JWT['SIGNING_KEY'],
            algorithms=[SIMPLE_JWT['ALGORITHM']],
        )
        url = reverse(
            'tfcuser-detail', args=[token_data['user_id']])
        response.data['url'] = request.build_absolute_uri(url)
        return response
