import { db, auth } from '../common/Firebase';

export const firebaseMixin = {
  methods: {
    async deleteProyect(proyect) {
      try {
        await db
          .collection('proyects')
          .doc(proyect.id)
          .delete();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUserWhitEmailPassword(user) {
      try {
        await db
          .collection('users')
          .doc(user.id)
          .delete();

        await auth.signInWithEmailAndPassword(user.correo, user.password);
        const userCurrent = auth.currentUser;
        await userCurrent.delete();
        console.log('ELIINADDOO');
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
        console.log('ENTREE');
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
    async getStudents() {
      try {
        console.log('ENTREE');
        const users = await db
          .collection('users')
          .where('rol', '==', 'alumno')
          .get();

        users.forEach((e) => {
          let user = {};
          user.nombre = `${e.data().matricula} - ${e.data().nombre} ${
            e.data().apellidoPaterno
          } ${e.data().apellidoMaterno}`;
          user.id = e.id;
          this.users.push(user);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getProyects() {
      try {
        const proyects = await db.collection('proyects').get();

        proyects.forEach((e) => {
          let proyect = e.data();
          proyect.id = e.id;
          this.proyects.push(proyect);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
