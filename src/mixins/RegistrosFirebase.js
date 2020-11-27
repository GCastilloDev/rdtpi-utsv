import { db } from '../common/Firebase';

export const firebaseMixin = {
  methods: {
    async registarUsuarioDB(uid, user) {
      let userData = user;
      delete userData.password;
      userData.uid = uid;

      try {
        await db
          .collection('users')
          // .doc(uid)
          .add(userData);
      } catch (error) {
        console.log(error);
      }
    },
    async getUsersByRol(rol) {
      try {
        const users = await db
          .collection('users')
          .where('rol', '==', rol)
          .get();

        users.forEach((e) => {
          let user = e.data();
          user.id = e.id;
          console.log(user);
          this.users.push(user);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
