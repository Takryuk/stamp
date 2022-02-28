from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsAdminUser(BasePermission):

    def has_permission(self, request, view):
        return request.user.profile.is_admin
