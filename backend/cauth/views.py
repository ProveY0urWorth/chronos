from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class UserLoginView(APIView):
    def post(self, request):
        login_data = {
            'login': request.data.get('login'),
            'password': request.data.get('password')
        }
        user = authenticate(**login_data)
        
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)


from rest_framework import generics
from rest_framework.permissions import AllowAny
from cauth.models import CustomUser
from cauth.serializers import CustomUserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)
