import { db, auth } from '../common/Firebase';

export const firebaseMixin = {
  methods: {
    async deleteUserWhitEmailPassword(user) {
      try {
        await auth.signInWithEmailAndPassword(user.correo, user.password);
        const userCurrent = auth.currentUser;
        await userCurrent.delete();
        await db
          .collection('users')
          .doc(user.id)
          .delete();
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserWhithEmailPassword(userOld, userUpdated) {
      try {
        await auth.signInWithEmailAndPassword(userOld.correo, userOld.password);

        delete userUpdated.id;

        const userCurrent = auth.currentUser;

        await userCurrent.updateEmail(userUpdated.correo);
        await userCurrent.updatePassword(userUpdated.password);
        await db
          .collection('users')
          .doc(userOld.id)
          .update(userUpdated);
      } catch (error) {
        console.log(error);
      }
    },
    async registarUsuarioDB(uid, user) {
      let userData = user;
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
