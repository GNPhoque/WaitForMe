import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

firebase.initializeApp({
	apiKey: "AIzaSyCgVnQz-uEu_qcOqMVyl39xxUaTPikliq0",
	authDomain: "waitforme-bf9ec.firebaseapp.com",
	databaseURL: "https://waitforme-bf9ec.firebaseio.com",
	projectId: "waitforme-bf9ec",
});

export default firebase;