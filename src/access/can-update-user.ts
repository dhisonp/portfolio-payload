import { Access } from 'payload/config';

const canUpdateUser: Access = ({ req: { user }, id }) => {
  return user || id;

  // TODO: To implement when admin roles are implemented
  // allow users with a role of 'admin'
  // if (user.roles && user.roles.some((role: string) => role === 'admin')) {
  //   return true
  // }
  // allow any other users to update only oneself
  // return user.id === id
};

export default canUpdateUser;
