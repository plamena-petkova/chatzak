//export const host = "https://chatzak.onrender.com";
//export const host = "http://localhost:5000";
export const host = "https://chatzak-server.onrender.com"
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const allUsersRoute = `${host}/api/auth/all-users`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getMsg`;
export const getLastMessagesRoute = `${host}/api/messages/getLastMsg`;
export const createAvatarRoute = `https://api.dicebear.com/7.x/bottts/svg?seed=`
export const updateAvatarRoute = `${host}/api/auth/users/`;
export const getUserByIdRoute = `${host}/api/auth/users/`;
export const deleteMessageRoute = `${host}/api/messages/message/`
export const editUserByIdRoute = `${host}/api/auth/users/edit/`
export const deleteUserByIdRoute = `${host}/api/auth/users/delete/`
export const invitationRoute = `${host}/api/auth/send-invitation`