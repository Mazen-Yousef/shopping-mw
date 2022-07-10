import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase.utils"

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    
    }
    return (
        <>
            <h2> Ich bin SignIn bage </h2>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup
            </button>
        </>
    )
}

export default SignIn