import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { User, LogOut } from "lucide-react";

interface UserInfo {
  email: string;
  name?: string;
  isSignup?: boolean;
}

interface ProfileHeaderProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

export function ProfileHeader({ userInfo, onLogout }: ProfileHeaderProps) {
  // Extract name from email if no name provided
  const getDisplayName = () => {
    if (userInfo.name) {
      return userInfo.name;
    }
    // Extract name from email (everything before @)
    const emailName = userInfo.email.split('@')[0];
    // Capitalize first letter and replace dots/underscores with spaces
    return emailName
      .replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get initials for avatar
  const getInitials = () => {
    const name = getDisplayName();
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-800">{getDisplayName()}</h3>
              <p className="text-sm text-slate-600">{userInfo.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <User className="h-3 w-3 mr-1" />
                  Verified User
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}