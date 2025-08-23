import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Palette,
  FileText,
  Award,
  Tag,
  Image,
  MessageSquare,
  Settings,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  usersAPI,
  themesAPI,
  blogsAPI,
  certificatesAPI,
  tagsAPI,
  imagesAPI,
  contactMessagesAPI,
  siteSettingsAPI,
} from "../services/api";

const Dashboard: React.FC = () => {
  const { data: users = [] } = useQuery(["users"], usersAPI.getAll);
  const { data: themes = [] } = useQuery(["themes"], themesAPI.getAll);
  const { data: blogs = [] } = useQuery(["blogs"], blogsAPI.getAll);
  const { data: certificates = [] } = useQuery(
    ["certificates"],
    certificatesAPI.getAll
  );
  const { data: tags = [] } = useQuery(["tags"], tagsAPI.getAll);
  const { data: images = [] } = useQuery(["images"], imagesAPI.getAll);
  const { data: messages = [] } = useQuery(
    ["messages"],
    contactMessagesAPI.getAll
  );
  const { data: settings = [] } = useQuery(
    ["settings"],
    siteSettingsAPI.getAll
  );

  const stats = [
    {
      name: "Total Users",
      value: users.length,
      icon: Users,
      change: "+12%",
      changeType: "positive",
      color: "bg-blue-500",
    },
    {
      name: "Published Themes",
      value: Array.isArray(themes)
        ? themes.filter((t) => t.isPublished).length
        : 0,
      icon: Palette,
      change: "+5%",
      changeType: "positive",
      color: "bg-purple-500",
    },
    {
      name: "Published Blogs",
      value: blogs.filter((b) => b.isPublished).length,
      icon: FileText,
      change: "+8%",
      changeType: "positive",
      color: "bg-green-500",
    },
    {
      name: "Published Certificates",
      value: certificates.filter((c) => c.isPublished).length,
      icon: Award,
      change: "+3%",
      changeType: "positive",
      color: "bg-yellow-500",
    },
    {
      name: "Active Tags",
      value: tags.filter((t) => t.isActive).length,
      icon: Tag,
      change: "+15%",
      changeType: "positive",
      color: "bg-indigo-500",
    },
    {
      name: "Total Images",
      value: images.length,
      icon: Image,
      change: "+20%",
      changeType: "positive",
      color: "bg-pink-500",
    },
    {
      name: "Unread Messages",
      value: messages.filter((m) => !m.isRead).length,
      icon: MessageSquare,
      change: "-2%",
      changeType: "negative",
      color: "bg-red-500",
    },
    {
      name: "Site Settings",
      value: settings.length,
      icon: Settings,
      change: "+0%",
      changeType: "neutral",
      color: "bg-gray-500",
    },
  ];

  const recentMessages = messages.slice(0, 5);
  const recentThemes = Array.isArray(themes) ? themes.slice(0, 5) : [];
  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your portfolio management system
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6">
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}>
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                ) : stat.changeType === "negative" ? (
                  <TrendingDown className="h-4 w-4 flex-shrink-0 self-center" />
                ) : null}
                <span className="sr-only">
                  {stat.changeType === "positive" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Messages
            </h3>
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div key={message._id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {message.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {message.subject}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!message.isRead && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        New
                      </span>
                    )}
                    {message.isReplied && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Replied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Themes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Themes
            </h3>
            <div className="space-y-3">
              {recentThemes.map((theme) => (
                <div key={theme._id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Palette className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {theme.title?.en}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {theme.tags.slice(0, 3).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {theme.isPublished ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Palette className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Add Theme
              </span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Add Blog
              </span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Award className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Add Certificate
              </span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Image className="h-8 w-8 text-pink-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Upload Image
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
