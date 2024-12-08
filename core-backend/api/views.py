from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

@api_view(['GET'])
def get_user(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    user_data = request.data
    serializer = UserSerializer(data=user_data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User Added Successfully"}, status=status.HTTP_201_CREATED)
    return Response({"message": "Failed to Add User", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        user_data = request.data
        serializer = UserSerializer(user, data=user_data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User Updated Successfully"})
        return Response({"message": "Failed to Update User", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "User Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)
