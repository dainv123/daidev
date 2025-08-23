import React, { useState, useEffect } from "react";
import { MessageSquare, Eye, Reply, Trash2, Check, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactMessagesAPI } from "../services/api";
import { ContactMessage, ContactMessageStatus } from "../types/api";

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const [replyContent, setReplyContent] = useState("");
  const replyMutation = useMutation({
    mutationFn: async ({
      id,
      replyContent,
    }: {
      id: string;
      replyContent: string;
    }) => {
      await contactMessagesAPI.reply(id, replyContent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setReplyContent("");
      setShowModal(false);
      setSelectedMessage(null);
    },
  });

  // Fetch messages
  const {
    data: messages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: contactMessagesAPI.getAll,
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      await contactMessagesAPI.markAsRead(messageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  // Mark as replied mutation
  const markAsRepliedMutation = useMutation({
    mutationFn: async (messageId: string) => {
      await contactMessagesAPI.markAsReplied(messageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      await contactMessagesAPI.delete(messageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setShowModal(false);
      setSelectedMessage(null);
    },
  });

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowModal(true);

    // Mark as read if not already read
    if (!message.isRead) {
      markAsReadMutation.mutate(message._id);
    }
  };

  const handleMarkAsReplied = (messageId: string) => {
    markAsRepliedMutation.mutate(messageId);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMessageMutation.mutate(messageId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <X className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading messages
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error
                ? error.message
                : "Unknown error occurred"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Contact Messages
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and respond to contact form submissions
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages?.map((message: ContactMessage) => (
                    <tr
                      key={message._id}
                      className={!message.isRead ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {message.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {message.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {message.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex items-center space-x-2">
                            {message.status === "error" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Error
                              </span>
                            )}
                            {message.status === "new" && !message.isRead && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                            {message.isReplied && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Replied
                              </span>
                            )}
                          </div>
                          {/* {message.status === "error" &&
                            message.errorMessage && (
                              <div className="text-xs text-red-600 mt-1">
                                {message.errorMessage}
                              </div>
                            )} */}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewMessage(message)}
                            className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          {!message.isReplied && (
                            <button
                              onClick={() => handleMarkAsReplied(message._id)}
                              className="text-green-600 hover:text-green-900">
                              <Reply className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(message._id)}
                            className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Message from {selectedMessage.name}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From:
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedMessage.email}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Subject:
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedMessage.subject}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Message:
                        </label>
                        <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Date:
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedMessage.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {selectedMessage.status === "error" && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-2">
                          <div className="text-xs text-red-700 font-semibold">
                            Error: {selectedMessage.errorMessage}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Hiển thị lịch sử reply và trạng thái gửi mail */}
                    {selectedMessage.replyLog &&
                      selectedMessage.replyLog.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold mb-2">
                            Reply History
                          </h4>
                          <div className="space-y-2">
                            {selectedMessage.replyLog.map((log, idx) => (
                              <div
                                key={idx}
                                className="border rounded p-2 bg-gray-50">
                                <div className="text-xs text-gray-700 mb-1">
                                  <span className="font-semibold">At:</span>{" "}
                                  {new Date(log.repliedAt).toLocaleString()}
                                  {log.adminEmail && (
                                    <span className="ml-2">
                                      by{" "}
                                      <span className="font-semibold">
                                        {log.adminEmail}
                                      </span>
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm mb-1 whitespace-pre-line">
                                  {log.content}
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs">
                                  <div>
                                    <span className="font-semibold">
                                      User mail:
                                    </span>{" "}
                                    {log.userMailStatus === "sent" ? (
                                      <span className="text-green-700">
                                        Sent
                                      </span>
                                    ) : log.userMailStatus === "error" ? (
                                      <span className="text-red-700">
                                        Error: {log.userMailError}
                                      </span>
                                    ) : (
                                      <span className="text-gray-500">
                                        Pending
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-semibold">
                                      Admin mail:
                                    </span>{" "}
                                    {log.adminMailStatus === "sent" ? (
                                      <span className="text-green-700">
                                        Sent
                                      </span>
                                    ) : log.adminMailStatus === "error" ? (
                                      <span className="text-red-700">
                                        Error: {log.adminMailError}
                                      </span>
                                    ) : (
                                      <span className="text-gray-500">
                                        Pending
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    {/* Form trả lời */}
                    {(selectedMessage.status === ContactMessageStatus.NEW ||
                      selectedMessage.status === ContactMessageStatus.ERROR) &&
                      !selectedMessage.isReplied && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            replyMutation.mutate({
                              id: selectedMessage._id,
                              replyContent,
                            });
                          }}
                          className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reply to user:
                          </label>
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your reply here..."
                            required
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              type="submit"
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={replyMutation.isLoading}>
                              {replyMutation.isLoading
                                ? "Sending..."
                                : "Send Reply"}
                            </button>
                          </div>
                        </form>
                      )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
