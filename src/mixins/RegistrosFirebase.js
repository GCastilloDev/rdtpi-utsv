import { db } from '../common/Firebase';

export const firebaseMixin = {
  methods: {
    async registarUsuarioDB(uid, user) {
      try {
        await db
          .collection('users')
          .doc(uid)
          .set(user);
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
          this.users.push(e.data());
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
