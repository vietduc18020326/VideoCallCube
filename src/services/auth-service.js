import ConnectyCube from 'react-native-connectycube';
import config from '../config';

export default class AuthService {
  init = () => ConnectyCube.init(...config);

  login = user => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(user)
        .then(() =>
          ConnectyCube.chat.connect({
            userId: user.id,
            password: user.password,
          }),
        )
        .then(resolve)
        .catch(reject);
    });
  };
  create = user => {
    return new Promise((resolve, reject) => {
      ConnectyCube.users
        .signup(user)
        .then(resolve)
        .catch(reject);
    });
  };

  getUser = param => {
    return new Promise((resolve, reject) => {
      ConnectyCube.users
        .get(param)
        .then(resolve)
        .catch(reject);
    });
  };

  logout = () => {
    ConnectyCube.chat.disconnect();
    ConnectyCube.destroySession();
  };
}
