import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { User } from '../../types';
import { formatDate } from '../../utils/helpers';
import { MOCK_USERS } from '../../utils/helpers';

const UsersTable: React.FC = () => {
  // Filter out passwords for display (mock data handling)
  const users = MOCK_USERS.map(({ password, ...user }) => user) as User[];
  
  // These would be connected to real actions in a Firebase implementation
  const viewUserDetails = (userId: string) => {
    console.log('Viewing user details for:', userId);
  };
  
  const deleteUser = (userId: string) => {
    console.log('Delete user:', userId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Users ({users.length})
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.joinDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.isAdmin ? 'Admin' : 'User'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => viewUserDetails(user.id)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      aria-label="View details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;