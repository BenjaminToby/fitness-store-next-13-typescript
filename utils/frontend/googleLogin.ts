import fetchApi from "./fetchApi";
import updateCartOnUserAuth from "./updateCartOnUserAuth";

export default async function googleLogin({ accessToken, setLoading }: { accessToken?: string; setLoading?: React.Dispatch<React.SetStateAction<any>> }) {
    let result;

    if (accessToken) {
        try {
            if (setLoading) setLoading(true);

            const loginGoogle: any = await fetchApi("/api/user/google-login", {
                method: "post",
                body: {
                    access_token: accessToken,
                },
            });

            result = loginGoogle;

            if (loginGoogle.success) {
                await updateCartOnUserAuth({ userId: loginGoogle?.user?.id });
            }

            localStorage.setItem("user", JSON.stringify(loginGoogle?.user));
            localStorage.setItem("csrf_k", loginGoogle.user?.csrf_k);

            if (loginGoogle.success) {
                window.location.reload();
            } else {
                setTimeout(() => {
                    if (setLoading) setLoading(false);
                }, 1000);
            }
        } catch (error) {
            if (setLoading) setLoading(false);
        }
    }

    return result;
}
